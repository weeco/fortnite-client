import { classToPlain, Expose, plainToClass } from 'class-transformer';
import { Message, MessageType } from './message';

export class PlatformMessage {
  @Expose({ name: '_type' })
  public messageType: MessageType;

  public message: Message;
  public platform: string;

  public static FROM_JSON(jsonObject: {}): PlatformMessage {
    return plainToClass(PlatformMessage, jsonObject);
  }

  public toJson(): {} {
    return classToPlain(PlatformMessage);
  }
}
