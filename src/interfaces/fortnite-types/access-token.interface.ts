export interface IAccessToken {
  access_token: string;
  expires_in: number;
  expires_at: string;
  token_type: string;
  refresh_token: string;
  refresh_expires: number;
  refresh_expires_at: string;
  account_id: string;
  client_id: string;
  internal_client: boolean;
  client_service: string;
  lastPasswordValidation: string;
  perms: IPerm[];
  app: string;
  in_app_id: string;
}

export interface IPerm {
  resource: string;
  action: number;
}
