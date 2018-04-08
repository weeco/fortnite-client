import { classToPlain, Expose, plainToClass, Type } from 'class-transformer';
import { Athenamessage } from './athenamessage';
import { Subgameselectdata } from './subgameselectdata';

export class Welcome {
  @Expose({ name: '_view' })
  public view: string;

  @Expose({ name: '_activeDate' })
  @Type(() => Date)
  public activeDate: Date;

  @Expose({ name: '_locale' })
  public locale: string;

  @Expose({ name: '_title' })
  public title: string;

  public lastModified: string;

  @Type(() => Date)
  public expiresAt?: Date;

  @Type(() => Athenamessage)
  public survivalmessage: Athenamessage;

  @Type(() => Athenamessage)
  public athenamessage: Athenamessage;

  @Type(() => Subgameselectdata)
  public subgameselectdata: Subgameselectdata;

  @Type(() => Athenamessage)
  public savetheworldnews: Athenamessage;

  @Type(() => Athenamessage)
  public battleroyalenews: Athenamessage;

  @Type(() => Athenamessage)
  public loginmessage: Athenamessage;

  @Type(() => Athenamessage)
  public emergencynotice: Athenamessage;

  public static FROM_JSON(jsonObject: {}): Welcome {
    return plainToClass(Welcome, jsonObject);
  }

  public toJson(): {} {
    return classToPlain(Welcome);
  }
}
