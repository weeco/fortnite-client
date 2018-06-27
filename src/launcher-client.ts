import * as cheerio from 'cheerio';
import { RequestAPI, RequestResponse, RequiredUriUrl } from 'request';
import * as request from 'request-promise-native';
import { LoginToken } from './enums/static-token.enum';
import { IFortniteClientCredentials } from './interfaces/fortnite-client-credentials.interface';
import { IFortniteClientOptions } from './interfaces/fortnite-client-options.interface';
import { IRequestOAuthTokenConfig } from './interfaces/request-oauth-token.interface';
import { BuildInformation } from './models/build-information/build-information';
import { AccessToken } from './models/login/access-token';
import { LauncherUrlHelper } from './utils/launcher-url-helper';

/**
 * Covers endpoints accessible from within the Epic Games launcher
 */
export class LauncherClient {
  private apiRequest: RequestAPI<request.RequestPromise, request.RequestPromiseOptions, RequiredUriUrl>;
  private credentials: IFortniteClientCredentials;
  private readonly clientId: string = '24a1bff3f90749efbfcbc576c626a282';
  private readonly redirectUri: string = 'https://accounts.launcher-website-prod07.ol.epicgames.com/login' +
  `/showPleaseWait?client_id=${this.clientId}&rememberEmail=false`;

  /**
   * Creates a new LauncherClient instance.
   * @param credentials The account's credentials which shall be used for the REST requests.
   * @param options Library specific options (such as a response timeout until it throws an exception).
   */
  constructor(credentials: IFortniteClientCredentials, options: IFortniteClientOptions) {
    this.apiRequest = request.defaults({
      method: 'GET',
      timeout: options.timeoutMs,
      proxy: options.proxy,
      rejectUnauthorized: false,
      json: true,
      resolveWithFullResponse: true,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      jar: true,
      gzip: true
    });

    this.credentials = credentials;
  }

  public async buildInformation(): Promise<BuildInformation> {
    const targetUrl: string = `${LauncherUrlHelper.publicAssets}/Windows`;
    const queryParams: {} = {
      label: 'Live'
    };
    const response: RequestResponse = await this.apiRequest(targetUrl, {
      qs: queryParams
    });

    return BuildInformation.FROM_JSON(response.body[0]);
  }

  public async login(): Promise<void> {
    await this.fetchRedirectCookies();
    const xsrfDetails: IXsrfInformation = await this.fetchLoginForm();
    await this.doLauncherLogin(xsrfDetails);
    const exchangeCode: string = await this.fetchExchangeCode();
    const oAuthToken: AccessToken = await this.getOauthToken(exchangeCode);

    // Insert auth token into default request
    this.updateClientAccessToken(oAuthToken);
  }

  private async fetchRedirectCookies(): Promise<void> {
    const targetUrl: string = `${LauncherUrlHelper.login}/launcher`;
    const queryParams: {} = {
      client_id: this.clientId,
      redirectUrl: this.redirectUri,
      isLauncher: true
    };

    try {
      await this.apiRequest(targetUrl, {
        qs: queryParams
      });
    } catch (err) {
      console.error(`Error while fetching redirect cookies in launcher login: ${err}`);
    }
  }

  private async fetchLoginForm(): Promise<IXsrfInformation> {
    const targetUrl: string = `${LauncherUrlHelper.login}/doLauncherLogin`;
    const queryParams: {} = {
      client_id: this.clientId,
      redirectUrl: this.redirectUri
    };

    const response: RequestResponse = await this.apiRequest(targetUrl, {
      qs: queryParams
    });
    const $: CheerioStatic = cheerio.load(response.body);
    const xsrfToken: string = $('#X-XSRF-TOKEN').val();
    const xsrfUri: string = $('#X-XSRF-URI').val();

    return { xsrfToken, xsrfUri };
  }

  private async doLauncherLogin(xsrf: IXsrfInformation): Promise<void> {
    const targetUrl: string = `${LauncherUrlHelper.login}/doLauncherLogin`;
    const queryParams: {} = {
      'X-XSRF-TOKEN': xsrf.xsrfToken,
      'X-XSRF-URI': xsrf.xsrfUri,
      fromForm: 'yes',
      authType: '',
      linkExtAuth: '',
      client_id: this.clientId,
      redirectUrl: this.redirectUri,
      epic_username: this.credentials.email,
      password: this.credentials.password
    };
    await this.apiRequest(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      form: queryParams
    });
  }

  private async fetchExchangeCode(): Promise<string> {
    const response: RequestResponse = await this.apiRequest(this.redirectUri, {
      headers: {
        'Accept-Language': 'en-US'
      }
    });
    const regex: RegExp = /loginWithExchangeCode\('([a-z0-9]*)'/;

    return regex.exec(response.body)[1];
  }

  private async getOauthToken(exchangeCode: string): Promise<AccessToken> {
    const requestTokenConfig: IRequestOAuthTokenConfig = {
      grant_type: 'exchange_code',
      exchange_code: exchangeCode,
      includePerms: true,
      token_type: 'eg1'
    };

    const oAuthTokenResponse: RequestResponse = await this.apiRequest(LauncherUrlHelper.oauthToken, {
      headers: {
        'Accept-Language': 'en-US',
        Authorization: `basic ${LoginToken.Launcher}`
      },
      method: 'POST',
      form: requestTokenConfig,
      jar: false
    });

    return AccessToken.FROM_JSON(<{}>oAuthTokenResponse.body);
  }

  /**
   * Updates the default auth header for client requests and sets the property
   * @param token The new client access token
   */
  private updateClientAccessToken(token: AccessToken): void {
    this.apiRequest = this.apiRequest.defaults({
      headers: {
        Authorization: `bearer ${token.accessToken}`
      }
    });
  }
}

interface IXsrfInformation {
  xsrfToken: string;
  xsrfUri: string;
}
