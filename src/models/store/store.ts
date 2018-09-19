import { classToPlain, plainToClass, Type } from 'class-transformer';
import { IStoreFront, Storefront } from './storefront';

export class Store {
  public refreshIntervalHrs: number;
  public dailyPurchaseHrs: number;
  public expiration: string;

  @Type(() => Storefront)
  public storefronts: Storefront[];

  public static FROM_JSON(jsonObject: {}): Store {
    return plainToClass(Store, jsonObject);
  }

  /* istanbul ignore next */
  public toJson(): {} {
    return classToPlain(this);
  }
}

export interface IStore {
  refreshIntervalHrs: number;
  dailyPurchaseHrs: number;
  expiration: string;
  storefronts: IStoreFront[];
}
