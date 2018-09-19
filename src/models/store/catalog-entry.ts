import { classToPlain, plainToClass, Type } from 'class-transformer';
import { GiftInfo, IGiftInfo } from './gift-info';
import { IItemGrant, ItemGrant } from './item-grant';
import { IMetaAssetInfo, MetaAssetInfo } from './meta-asset-info';
import { IMetaInfo, MetaInfo } from './meta-info';
import { IPrice, Price } from './price';
import { IRequirement, Requirement } from './requirement';

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

  /* istanbul ignore next */
  public toJson(): ICatalogEntry {
    return <ICatalogEntry>classToPlain(this);
  }
}

export enum CatalogGroup {
  Empty = ''
}

export enum OfferType {
  StaticPrice = 'StaticPrice'
}

export interface ICatalogEntry {
  offerId: string;
  devName: string;
  offerType: OfferType;
  prices: IPrice[];
  categories: string[];
  dailyLimit: number;
  weeklyLimit: number;
  monthlyLimit: number;
  appStoreId: string[];
  requirements: IRequirement[];
  metaInfo?: IMetaInfo[];
  catalogGroup?: CatalogGroup;
  catalogGroupPriority: number;
  sortPriority: number;
  title?: string;
  shortDescription?: string;
  description?: string;
  displayAssetPath?: string;
  itemGrants: IItemGrant[];
  giftInfo?: IGiftInfo;
  metaAssetInfo?: IMetaAssetInfo;
  fulfillmentIds?: string[];
  matchFilter?: CatalogGroup;
  filterWeight?: number;
  refundable?: boolean;
}
