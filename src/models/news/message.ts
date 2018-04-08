import { classToPlain, plainToClass } from 'class-transformer';

export class Message {
  public image?: string;
  public hidden?: boolean;
  public title: string;
  public body: string;
  public messagetype?: MessageType;

  public static FROM_JSON(jsonObject: {}): Message {
    return plainToClass(Message, jsonObject);
  }

  public toJson(): {} {
    return classToPlain(Message);
  }
}

export enum MessageType {
  CommonUISimpleMessageBase = 'CommonUI Simple Message Base'
}
