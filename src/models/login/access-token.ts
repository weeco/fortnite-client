import { classToPlain, Expose, plainToClass, Type } from 'class-transformer';
import { Perm } from './perm';

export class AccessToken {
  @Expose({ name: 'access_token' })
  public accessToken: string;

  @Expose({ name: 'expires_in' })
  public expiresIn: number;

  @Type(() => Date)
  @Expose({ name: 'expires_at' })
  public expiresAt: Date;

  @Expose({ name: 'token_type' })
  public tokenType: string;

  @Expose({ name: 'refresh_token' })
  public refreshToken: string;

  @Expose({ name: 'refresh_expires' })
  public refreshExpires: number;

  @Type(() => Date)
  @Expose({ name: 'access_token' })
  public refreshExpiresAt: Date;

  @Expose({ name: 'account_id' })
  public accountId: string;

  @Expose({ name: 'client_id' })
  public clientId: string;

  @Expose({ name: 'internal_client' })
  public internalClient: boolean;

  @Expose({ name: 'client_service' })
  public clientService: string;

  // API returns lower camelcase for this property.
  public lastPasswordValidation: string;

  @Type(() => Perm)
  public perms: Perm[];

  @Expose({ name: 'app' })
  public app: string;

  @Expose({ name: 'in_app_id' })
  public inAppId: string;

  public static FROM_JSON(jsonObject: {}): AccessToken {
    return plainToClass(AccessToken, jsonObject);
  }

  public toJson(): {} {
    return classToPlain(AccessToken);
  }
}
