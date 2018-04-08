import { classToPlain, Expose, plainToClass, Type } from 'class-transformer';
import { Message } from './message';

export class Loginmessage {
  @Expose({ name: '_type' })
  public messageType: string;

  @Type(() => Message)
  public message: Message;

  public static FROM_JSON(jsonObject: {}): Loginmessage {
    return plainToClass(Loginmessage, jsonObject);
  }

  public toJson(): {} {
    return classToPlain(Loginmessage);
  }
}
