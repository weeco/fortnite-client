import { classToPlain, plainToClass } from 'class-transformer';

export class Payload {
  public chaseItems: string[];
  public packDefinition: string;

  /* istanbul ignore next */
  public static FROM_JSON(jsonObject: {}): Payload {
    return plainToClass(Payload, jsonObject);
  }

  /* istanbul ignore next */
  public toJson(): IPayload {
    return <IPayload>classToPlain(this);
  }
}

export interface IPayload {
  chaseItems: string[];
  packDefinition: string;
}
