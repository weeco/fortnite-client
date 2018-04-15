import { classToPlain, plainToClass } from 'class-transformer';

export class OAuthExchange {
  public code: string;
  public creatingClientId: string;
  public expiresInSeconds: number;

  public static FROM_JSON(jsonObject: {}): OAuthExchange {
    return plainToClass(OAuthExchange, jsonObject);
  }

  /* istanbul ignore next */
  public toJson(): {} {
    return classToPlain(this);
  }
}
