import { classToPlain, Expose, plainToClass } from 'class-transformer';
import { IMessage, Message, MessageType } from './message';

export class PlatformMessage {
  @Expose({ name: '_type' })
  public messageType: MessageType;

  public message: Message;
  public platform: string;

  /* istanbul ignore next */
  public static FROM_JSON(jsonObject: {}): PlatformMessage {
    return plainToClass(PlatformMessage, jsonObject);
  }

  /* istanbul ignore next */
  public toJson(): IPlatformMessage {
    return <IPlatformMessage>classToPlain(this);
  }
}

export interface IPlatformMessage {
  _type: MessageType;
  message: IMessage;
  platform: string;
}
