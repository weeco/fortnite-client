import { classToPlain, Expose, plainToClass, Type } from 'class-transformer';
import { Athenamessage, IAthenaMessage } from './athenamessage';
import { ISubgameselectdata, Subgameselectdata } from './subgameselectdata';

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

  /* istanbul ignore next */
  public toJson(): {} {
    return classToPlain(this);
  }
}

export interface IWelcome {
  _view: string;
  _activeDate: string;
  _locale: string;
  _title: string;
  lastModified: string;
  expiresAt?: string;
  survivalmessage: IAthenaMessage;
  athenamessage: IAthenaMessage;
  subgameselectdata: ISubgameselectdata;
  savetheworldnews: IAthenaMessage;
  battleroyalenews: IAthenaMessage;
  loginmessage: IAthenaMessage;
  emergencynotice: IAthenaMessage;
}
