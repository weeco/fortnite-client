import { classToPlain, Expose, plainToClass, Type } from 'class-transformer';
import { IMessage, Message } from './message';

export class Loginmessage {
  @Expose({ name: '_type' })
  public messageType: string;

  @Type(() => Message)
  public message: Message;

  /* istanbul ignore next */
  public static FROM_JSON(jsonObject: {}): Loginmessage {
    return plainToClass(Loginmessage, jsonObject);
  }

  /* istanbul ignore next */
  public toJson(): ILoginmessage {
    return <ILoginmessage>classToPlain(this);
  }
}

export interface ILoginmessage {
  _type: string;
  message: IMessage;
}
