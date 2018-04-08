import { classToPlain, Expose, plainToClass, Type } from 'class-transformer';
import { Loginmessage } from './loginmessage';
import { News } from './news';

export class Athenamessage {
  @Expose({ name: '_view' })
  public view: string;

  @Expose({ name: '_activeDate' })
  public activeDate: string;

  @Expose({ name: '_locale' })
  public locale: string;

  @Expose({ name: '_title' })
  public title: string;

  public lastModified: string;

  @Type(() => Date)
  public expiresAt?: Date;

  public overrideablemessage?: Loginmessage;

  @Type(() => News)
  public news?: News;

  @Type(() => Loginmessage)
  public loginmessage?: Loginmessage;

  public static FROM_JSON(jsonObject: {}): Athenamessage {
    return plainToClass(Athenamessage, jsonObject);
  }

  public toJson(): {} {
    return classToPlain(Athenamessage);
  }
}
