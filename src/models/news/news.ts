import { classToPlain, Expose, plainToClass, Type } from 'class-transformer';
import { IMessage, Message, MessageType } from './message';
import { IPlatformMessage, PlatformMessage } from './platform-message';

export class News {
  @Expose({ name: 'platform_messages' })
  @Expose({ name: 'platform_messages' })
  @Type(() => PlatformMessage)
  public platformMessages?: PlatformMessage[];

  @Expose({ name: '_type' })
  public messageType: MessageType;

  @Type(() => Message)
  public messages?: Message[];

  public static FROM_JSON(jsonObject: {}): News {
    return plainToClass(News, jsonObject);
  }

  /* istanbul ignore next */
  public toJson(): INews {
    return <INews>classToPlain(this);
  }
}

export interface INews {
  platform_messages: IPlatformMessage[];
  _type: MessageType;
  messages: IMessage[];
}
