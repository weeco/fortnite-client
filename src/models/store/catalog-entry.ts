import { plainToClass, Type } from 'class-transformer';
import { GiftInfo } from './gift-info';
import { MetaInfo } from './meta-info';
import { Price } from './price';
import { Requirement } from './requirement';
import { ItemGrant } from './item-grant';
import { MetaAssetInfo } from './meta-asset-info';

export class CatalogEntry {
  public offerId: string;
  public devName: string;
  public offerType: OfferType;

  @Type(() => Price)
  public prices: Price[];
  public categories: string[];
  public dailyLimit: number;
  public weeklyLimit: number;
  public monthlyLimit: number;
  public appStoreId: string[];

  @Type(() => Requirement)
  public requirements: Requirement[];

  @Type(() => MetaInfo)
  public metaInfo?: MetaInfo[];
  public catalogGroup?: CatalogGroup;
  public catalogGroupPriority: number;
  public sortPriority: number;
  public title?: string;
  public shortDescription?: string;
  public description?: string;
  public displayAssetPath?: string;

  @Type(() => ItemGrant)
  public itemGrants: ItemGrant[];

  @Type(() => GiftInfo)
  public giftInfo?: GiftInfo;

  @Type(() => MetaAssetInfo)
  public metaAssetInfo?: MetaAssetInfo;
  public fulfillmentIds?: string[];
  public matchFilter?: CatalogGroup;
  public filterWeight?: number;
  public refundable?: boolean;

  public static FROM_JSON(jsonObject: {}): CatalogEntry {
    return plainToClass(CatalogEntry, jsonObject);
  }
}

export enum CatalogGroup {
  Empty = ''
}

export enum OfferType {
  StaticPrice = 'StaticPrice'
}
