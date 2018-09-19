import { classToPlain, plainToClass, Type } from 'class-transformer';
import { CatalogEntry, ICatalogEntry } from './catalog-entry';

export class Storefront {
  public name: string;

  @Type(() => CatalogEntry)
  public catalogEntries: CatalogEntry[];

  /* istanbul ignore next */
  public static FROM_JSON(jsonObject: {}): Storefront {
    return plainToClass(Storefront, jsonObject);
  }

  /* istanbul ignore next */
  public toJson(): IStoreFront {
    return <IStoreFront>classToPlain(this);
  }
}

export interface IStoreFront {
  name: string;
  catalogEntries: ICatalogEntry[];
}
