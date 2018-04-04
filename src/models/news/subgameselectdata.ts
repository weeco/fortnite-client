import { Expose, plainToClass, Type } from 'class-transformer';
import { Loginmessage } from './loginmessage';

export class Subgameselectdata {
  @Expose({ name: '_view' })
  public view: string;

  @Expose({ name: '_activeDate' })
  @Type(() => Date)
  public activeDate: Date;

  @Expose({ name: '_locale' })
  public locale: string;

  @Expose({ name: '_title' })
  public title: string;

  @Type(() => Loginmessage)
  public saveTheWorldUnowned: Loginmessage;

  public lastModified: string;

  @Type(() => Date)
  public expiresAt: Date;

  @Type(() => Loginmessage)
  public battleRoyale: Loginmessage;

  @Type(() => Loginmessage)
  public saveTheWorld: Loginmessage;

  public static FROM_JSON(jsonObject: {}): Subgameselectdata {
    return plainToClass(Subgameselectdata, jsonObject);
  }
}
