import { classToPlain, Expose, plainToClass } from 'class-transformer';
import { Message, MessageType } from './message';

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
  public toJson(): {} {
    return classToPlain(this);
  }
}
