import { CookieJar, RequestAPI, RequestResponse, RequiredUriUrl } from 'request';
import * as request from 'request-promise-native';
import { IFortniteClientOptions } from './interfaces/client-options.interface';
import { IFortniteClientCredentials } from './interfaces/fortnite-client-credentials.interface';
import { AccessToken } from './models/login/access-token';
import { OAuthExchange } from './models/login/oauth-exchange';
import { Lookup } from './models/lookup/lookup';
import { Welcome } from './models/news/welcome';
import { IPlayerStats, PlayerStats } from './models/stats/player-stats';
import { Status } from './models/status/status';
import { Store } from './models/store/store';
import { FortniteURLHelper } from './utils/fortnite-url-helper';

/**
 * Fortnite client
 */
export class FortniteClient {
  private apiRequest: RequestAPI<request.RequestPromise, request.RequestPromiseOptions, RequiredUriUrl>;
  private credentials: IFortniteClientCredentials;
  private launcherAccessToken: AccessToken;
  private clientAccessToken: AccessToken;

  constructor(credentials: IFortniteClientCredentials, options?: IFortniteClientOptions) {
    const defaultOptions: IFortniteClientOptions = {
      debug: false,
      timeoutMs: 5 * 1000
    };
    const fullOptions: IFortniteClientOptions = { ...defaultOptions, ...options };

    this.apiRequest = request.defaults({
      method: 'GET',
      timeout: fullOptions.timeoutMs,
      proxy: {
        host: '127.0.0.1',
        port: 8888
      },
      rejectUnauthorized: false,
      json: true,
      resolveWithFullResponse: true
    });
    this.credentials = credentials;
  }

  public static async CHECK_STATUS(): Promise<Status> {
    const statusResponse: RequestResponse = await request.get({
      url: FortniteURLHelper.serviceStatus,
      timeout: 5 * 1000,
      json: true,
      resolveWithFullResponse: true
    });

    return Status.FROM_JSON(statusResponse.body[0]);
  }

  public static async GET_GAME_NEWS(countryCode: string = 'US'): Promise<Welcome> {
    const jar: CookieJar = request.jar();
    jar.setCookie('epicCountry', countryCode);
    const statusResponse: RequestResponse = await request.get({
      url: FortniteURLHelper.gameNews,
      timeout: 5 * 1000,
      json: true,
      resolveWithFullResponse: true,
      jar
    });

    return Welcome.FROM_JSON(statusResponse.body);
  }

  public async login(): Promise<void> {
    this.launcherAccessToken = await this.requestAccessToken();
    setTimeout(
      async () => this.onTokenExpired(this.launcherAccessToken, this.credentials.clientLauncherToken),
      this.launcherAccessToken.expiresIn * 1000 - 15 * 1000
    );

    const oAuthExchange: OAuthExchange = await this.requestOAuthExchange(this.launcherAccessToken);
    const clientAccessToken: AccessToken = await this.requestOAuthToken(oAuthExchange.code);
    this.updateClientAccessToken(clientAccessToken);
    setTimeout(
      async () => this.onTokenExpired(this.clientAccessToken, this.credentials.clientToken),
      this.clientAccessToken.expiresIn * 1000 - 15 * 1000
    );
  }

  // TODO: Fix this endpoint
  // public async getPveStats(accountId: string): Promise<void> {
  //   const targetUrl: string = FortniteURLHelper.GET_PVE_URL(accountId);
  //   const params: {} = { profileId: 'profile0', rvn: -1 };
  //   const pveStatsResponse: RequestResponse = await this.apiRequest({
  //     url: targetUrl,
  //     qs: params,
  //     method: 'POST'
  //   });

  //   return;
  // }

  public async getBattleRoyaleStatsById(userId: string): Promise<PlayerStats> {
    const playerStats: RequestResponse = await this.apiRequest({
      url: FortniteURLHelper.GET_PLAYER_PROFILE_REQUEST_URL(userId)
    });
    const preparedObject: IPlayerStats = {
      stats: playerStats.body
    };

    return PlayerStats.FROM_JSON(preparedObject);
  }

  public async getStore(locale: string = 'en-US'): Promise<Store> {
    const storeResponse: RequestResponse = await this.apiRequest({
      url: FortniteURLHelper.store,
      headers: {
        'X-EpicGames-Language': locale
      }
    });

    return Store.FROM_JSON(storeResponse.body);
  }

  /**
   * Checks if a player with the given name exists. If it exists, it will return the playerId
   * @param username Full text playername (e. g. 'NinjasHyper')
   */
  public async lookup(username: string): Promise<Lookup> {
    const targetUrl: string = FortniteURLHelper.lookup;
    const params: {} = { q: username };
    const lookupResponse: RequestResponse = await this.apiRequest({
      url: targetUrl,
      qs: params
    });

    return Lookup.FROM_JSON(lookupResponse.body);
  }

  /**
   * Updates the default auth header for client requests and sets the property
   * @param token The new client access token
   */
  private updateClientAccessToken(token: AccessToken): void {
    this.clientAccessToken = token;
    this.apiRequest = this.apiRequest.defaults({
      headers: {
        Authorization: `bearer ${token.accessToken}`
      }
    });
  }

  private async onTokenExpired(token: AccessToken, secretKey: string): Promise<void> {
    const refreshedToken: AccessToken = await this.refreshToken(token, secretKey);
    switch (secretKey) {
      case this.credentials.clientToken:
        this.updateClientAccessToken(refreshedToken);
        break;

      case this.credentials.clientLauncherToken:
        this.launcherAccessToken = refreshedToken;
        break;

      default:
        throw new Error('Expired token could not be identified by comparing the secret key');
    }

    setTimeout(async () => this.onTokenExpired(refreshedToken, secretKey), refreshedToken.expiresIn * 1000 - 15 * 1000);
  }

  private async refreshToken(token: AccessToken, secretKey: string): Promise<AccessToken> {
    const tokenRequestConfig: IRequestRefreshTokenConfig = {
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken,
      includePerms: true
    };
    const refreshTokenResponse: RequestResponse = await this.apiRequest({
      url: FortniteURLHelper.oAuthToken,
      headers: {
        Authorization: `basic ${secretKey}`
      },
      form: tokenRequestConfig,
      method: 'POST'
    });

    return AccessToken.FROM_JSON(refreshTokenResponse.body);
  }

  private async requestOAuthToken(authCode: string): Promise<AccessToken> {
    const requestTokenConfig: IRequestOAuthTokenConfig = {
      grant_type: 'exchange_code',
      exchange_code: authCode,
      includePerms: true,
      token_type: 'eg1'
    };
    const oAuthTokenResponse: RequestResponse = await this.apiRequest({
      url: FortniteURLHelper.oAuthToken,
      headers: {
        Authorization: `basic ${this.credentials.clientToken}`
      },
      form: requestTokenConfig,
      method: 'POST'
    });

    return AccessToken.FROM_JSON(oAuthTokenResponse.body);
  }

  private async requestOAuthExchange(accessToken: AccessToken): Promise<OAuthExchange> {
    const oAuthExchangeResponse: RequestResponse = await this.apiRequest(FortniteURLHelper.oAuthExchange, {
      headers: {
        Authorization: `bearer ${accessToken.accessToken}`
      }
    });

    return OAuthExchange.FROM_JSON(oAuthExchangeResponse.body);
  }

  /**
   * Request Login Token after (logging in with password)
   */
  private async requestAccessToken(): Promise<AccessToken> {
    const requestTokenConfig: IRequestAccessTokenConfig = {
      grant_type: 'password',
      username: this.credentials.email,
      password: this.credentials.password,
      includePerms: true
    };
    const accessTokenResponse: RequestResponse = await this.apiRequest(FortniteURLHelper.oAuthToken, {
      form: requestTokenConfig,
      headers: {
        Authorization: `basic ${this.credentials.clientLauncherToken}`
      },
      method: 'POST'
    });

    return AccessToken.FROM_JSON(accessTokenResponse.body);
  }
}

export enum Platform {
  PC = 'pc',
  PS4 = 'ps4',
  XBOX = 'xb1'
}

interface IRequestAccessTokenConfig {
  grant_type: 'password' | 'exchange_code';
  username: string;
  password: string;
  includePerms: boolean;
}

interface IRequestOAuthTokenConfig {
  grant_type: 'password' | 'exchange_code';
  exchange_code: string;
  includePerms: boolean;
  token_type: 'eg1';
}

interface IRequestRefreshTokenConfig {
  grant_type: 'refresh_token';
  refresh_token: string;
  includePerms: boolean;
}
