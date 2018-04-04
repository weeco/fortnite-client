import { plainToClass, Type } from 'class-transformer';
import { Storefront } from './storefront';

export class Store {
  public refreshIntervalHrs: number;
  public dailyPurchaseHrs: number;
  public expiration: string;

  @Type(() => Storefront)
  public storefronts: Storefront[];

  public static FROM_JSON(jsonObject: {}): Store {
    return plainToClass(Store, jsonObject);
  }
}
