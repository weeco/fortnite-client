import { RequestAPI, RequestResponse, RequiredUriUrl } from 'request';
import * as request from 'request-promise-native';
import { GroupType } from './enums/group-type.enum';
import { LeaderboardType } from './enums/leaderboard-type.enum';
import { Platform } from './enums/platform.enum';
import { LoginToken } from './enums/static-token.enum';
import { TimeWindow } from './enums/time-window.enum';
import { IPlayerStats } from './interfaces/converted-fortnite-types/converted-stats-item.interface';
import { IFortniteClientCredentials } from './interfaces/fortnite-client-credentials.interface';
import { IFortniteClientOptions } from './interfaces/fortnite-client-options.interface';
import { IAccessToken } from './interfaces/fortnite-types/access-token.interface';
import { ICheckStatus } from './interfaces/fortnite-types/check-status.interface';
import { IGameNews } from './interfaces/fortnite-types/game-news.interface';
import { ILeaderboardEntry, ILeaderboards } from './interfaces/fortnite-types/leaderboards.interface';
import { ILookup } from './interfaces/fortnite-types/lookup.interface';
import { IOAuthExchange } from './interfaces/fortnite-types/oauth-exchange.interface';
import { IStatsItem } from './interfaces/fortnite-types/stats-item.interface';
import { IStore } from './interfaces/fortnite-types/store.interface';
import { IRequestOAuthTokenConfig } from './interfaces/request-oauth-token.interface';
import { FortniteURLHelper } from './utils/fortnite-url-helper';
import { JSONConvert } from './utils/json-converter';

/**
 * Fortnite client
 */
export class FortniteClient {
  private apiRequest: RequestAPI<request.RequestPromise, request.RequestPromiseOptions, RequiredUriUrl>;
  private credentials: IFortniteClientCredentials;
  private launcherAccessToken: IAccessToken;
  private clientAccessToken: IAccessToken;

  /**
   * Creates a new fortnite client instance.
   * @param credentials The account's credentials which shall be used for the REST requests.
   * @param options Library specific options (such as a response timeout until it throws an exception).
   */
  constructor(credentials: IFortniteClientCredentials, options?: IFortniteClientOptions) {
    const defaultOptions: IFortniteClientOptions = {
      timeoutMs: 5 * 1000,
      proxy: null
    };
    const fullOptions: IFortniteClientOptions = { ...defaultOptions, ...options };

    this.apiRequest = request.defaults({
      method: 'GET',
      timeout: fullOptions.timeoutMs,
      proxy: fullOptions.proxy,
      rejectUnauthorized: false,
      json: true,
      resolveWithFullResponse: true,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
    this.credentials = credentials;
  }

  public static async CHECK_STATUS(): Promise<ICheckStatus[]> {
    const statusResponse: RequestResponse = <RequestResponse>await request.get({
      url: FortniteURLHelper.serviceStatus,
      timeout: 5 * 1000,
      json: true,
      resolveWithFullResponse: true
    });

    return statusResponse.body;
  }

  public static async GET_GAME_NEWS(locale: string = 'en-US'): Promise<IGameNews> {
    const statusResponse: RequestResponse = <RequestResponse>await request.get({
      url: FortniteURLHelper.gameNews,
      timeout: 5 * 1000,
      json: true,
      resolveWithFullResponse: true,
      headers: {
        'Accept-Region': 'EU',
        'Accept-Language': locale
      }
    });

    return statusResponse.body;
  }

  public async login(): Promise<void> {
    this.launcherAccessToken = await this.requestAccessToken();
    /* istanbul ignore next */
    setTimeout(
      async () => this.onTokenExpired(this.launcherAccessToken, LoginToken.Launcher),
      this.launcherAccessToken.expires_in * 1000 - 15 * 1000
    );

    const oAuthExchange: IOAuthExchange = await this.requestOAuthExchange(this.launcherAccessToken);
    const clientAccessToken: IAccessToken = await this.requestOAuthToken(oAuthExchange.code);
    this.updateClientAccessToken(clientAccessToken);
    /* istanbul ignore next */
    setTimeout(
      async () => this.onTokenExpired(this.clientAccessToken, LoginToken.Fortnite),
      this.clientAccessToken.expires_in * 1000 - 15 * 1000
    );
    await this.killOtherSessions();
  }

  public async getBattleRoyaleStatsById(
    userId: string,
    timeWindow?: TimeWindow,
    convertJSONOutput?: true
  ): Promise<IPlayerStats>;
  public async getBattleRoyaleStatsById(
    userId: string,
    timeWindow?: TimeWindow,
    convertJSONOutput?: false
  ): Promise<IStatsItem[]>;
  public async getBattleRoyaleStatsById(
    userId: string,
    timeWindow: TimeWindow = TimeWindow.Alltime,
    convertJSONOutput: boolean = true
  ): Promise<IPlayerStats | IStatsItem[]> {
    const playerStats: RequestResponse = <RequestResponse>await this.apiRequest({
      url: FortniteURLHelper.GET_PLAYER_PROFILE_REQUEST_URL(userId, timeWindow)
    });
    const originalStats: IStatsItem[] = playerStats.body;

    if (!convertJSONOutput) {
      return originalStats;
    }

    return JSONConvert.convertPlayerStats(originalStats);
  }

  public async getLeaderboards(
    leaderboardType: LeaderboardType,
    platform: Platform,
    groupType: GroupType,
    timeWindow: TimeWindow = TimeWindow.Alltime,
    pageNumber: number = 0,
    limit: number = 50
  ): Promise<ILeaderboards> {
    const params: {} = { ownertype: 1, pageNumber, itemsPerPage: limit };
    const leaderboardsResponse: RequestResponse = <RequestResponse>await this.apiRequest({
      url: FortniteURLHelper.GET_LEADERBOARDS_URL(leaderboardType, platform, groupType, timeWindow),
      method: 'POST',
      qs: params,
      body: []
    });

    const response: Partial<ILeaderboards> = leaderboardsResponse.body;
    // Remove hyphens from all accountIds, so that they can be used for bulkLookup
    response.entries.forEach((x: ILeaderboardEntry) => {
      x.accountId = x.accountId.replace(/-/g, '');
    });
    const playerIds: string[] = response.entries.map((x: ILeaderboardEntry) => x.accountId);

    const playerNames: Map<string, ILookup> = await this.lookupByIds(playerIds);
    response.entries.forEach((x: ILeaderboardEntry) => (x.name = playerNames.get(x.accountId).displayName));

    return <ILeaderboards>response;
  }

  public async getStore(locale: string = 'en-US'): Promise<IStore> {
    const storeResponse: RequestResponse = <RequestResponse>await this.apiRequest({
      url: FortniteURLHelper.store,
      headers: {
        'X-EpicGames-Language': locale
      }
    });

    return storeResponse.body;
  }

  /**
   * Checks if a player with the given name exists. If it exists, it will return the playerId
   * @param username Full text playername (e. g. 'NinjasHyper')
   */
  public async lookup(username: string): Promise<ILookup> {
    const targetUrl: string = FortniteURLHelper.lookup;
    const params: {} = {
      q: username
    };
    const lookupResponse: RequestResponse = <RequestResponse>await this.apiRequest({
      url: targetUrl,
      qs: params
    });

    return lookupResponse.body;
  }

  /**
   * Get the player name by accountId in bulk.
   * Returns a Map with the accountId as key and the lookup object as value
   * @param accountIds AccountIDs which shall be looked up
   */
  public async lookupByIds(accountIds: string[]): Promise<Map<string, ILookup>> {
    // Map by accountId
    const lookupMap: Map<string, ILookup> = new Map();

    const targetUrl: string = FortniteURLHelper.lookupById;
    const params: {} = {
      accountId: accountIds
    };
    const response: RequestResponse = <RequestResponse>await this.apiRequest({
      url: targetUrl,
      qs: params,
      qsStringifyOptions: { indices: false }
    });
    const lookupResponse: ILookup[] = response.body;
    lookupResponse.forEach((x: ILookup) => lookupMap.set(x.id, x));

    return lookupMap;
  }

  /**
   * Updates the default auth header for client requests and sets the property
   * @param token The new client access token
   */
  private updateClientAccessToken(token: IAccessToken): void {
    this.clientAccessToken = token;
    this.apiRequest = this.apiRequest.defaults({
      headers: {
        Authorization: `bearer ${token.access_token}`
      }
    });
  }

  /* istanbul ignore next */
  private async onTokenExpired(token: IAccessToken, secretKey: string): Promise<void> {
    const refreshedToken: IAccessToken = await this.refreshToken(token, secretKey);
    switch (secretKey) {
      case LoginToken.Fortnite:
        this.updateClientAccessToken(refreshedToken);
        break;

      case LoginToken.Launcher:
        this.launcherAccessToken = refreshedToken;
        break;

      default:
        throw new Error('Expired token could not be identified by comparing the secret key');
    }

    setTimeout(
      async () => this.onTokenExpired(refreshedToken, secretKey),
      refreshedToken.expires_in * 1000 - 15 * 1000
    );
  }

  /**
   * Required to send right after successful login, when logging in frequently
   */
  private async killOtherSessions(): Promise<void> {
    await this.apiRequest({
      url: FortniteURLHelper.killOtherSessions,
      form: { killType: 'OTHERS_ACCOUNT_CLIENT_SERVICE' },
      method: 'DELETE'
    });
  }

  /* istanbul ignore next */
  private async refreshToken(token: IAccessToken, secretKey: string): Promise<IAccessToken> {
    const tokenRequestConfig: IRequestRefreshTokenConfig = {
      grant_type: 'refresh_token',
      refresh_token: token.refresh_token,
      includePerms: true
    };
    const refreshTokenResponse: RequestResponse = <RequestResponse>await this.apiRequest({
      url: FortniteURLHelper.oAuthToken,
      headers: {
        Authorization: `basic ${secretKey}`
      },
      form: tokenRequestConfig,
      method: 'POST'
    });

    return refreshTokenResponse.body;
  }

  private async requestOAuthToken(authCode: string): Promise<IAccessToken> {
    const requestTokenConfig: IRequestOAuthTokenConfig = {
      grant_type: 'exchange_code',
      exchange_code: authCode,
      includePerms: true,
      token_type: 'eg1'
    };
    const oAuthTokenResponse: RequestResponse = <RequestResponse>await this.apiRequest({
      url: FortniteURLHelper.oAuthToken,
      headers: {
        Authorization: `basic ${LoginToken.Fortnite}`
      },
      form: requestTokenConfig,
      method: 'POST'
    });

    return oAuthTokenResponse.body;
  }

  private async requestOAuthExchange(accessToken: IAccessToken): Promise<IOAuthExchange> {
    const oAuthExchangeResponse: RequestResponse = <RequestResponse>await this.apiRequest(
      FortniteURLHelper.oAuthExchange,
      {
        headers: {
          Authorization: `bearer ${accessToken.access_token}`
        }
      }
    );

    return oAuthExchangeResponse.body;
  }

  /**
   * Request Login Token after (logging in with password)
   */
  private async requestAccessToken(): Promise<IAccessToken> {
    const requestTokenConfig: IRequestAccessTokenConfig = {
      grant_type: 'password',
      username: this.credentials.email,
      password: this.credentials.password,
      includePerms: true
    };
    const accessTokenResponse: RequestResponse = <RequestResponse>await this.apiRequest(FortniteURLHelper.oAuthToken, {
      form: requestTokenConfig,
      headers: {
        Authorization: `basic ${LoginToken.Launcher}`
      },
      method: 'POST'
    });

    return accessTokenResponse.body;
  }
}

interface IRequestAccessTokenConfig {
  grant_type: 'password' | 'exchange_code';
  username: string;
  password: string;
  includePerms: boolean;
}

interface IRequestRefreshTokenConfig {
  grant_type: 'refresh_token';
  refresh_token: string;
  includePerms: boolean;
}
