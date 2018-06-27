export interface IRequestOAuthTokenConfig {
  grant_type: 'password' | 'exchange_code';
  exchange_code: string;
  includePerms: boolean;
  token_type: 'eg1';
}
