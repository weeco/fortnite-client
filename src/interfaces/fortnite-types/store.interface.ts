export interface IStore {
  refreshIntervalHrs: number;
  dailyPurchaseHrs: number;
  expiration: string;
  storefronts: IStorefront[];
}

export interface IStorefront {
  name: string;
  catalogEntries: ICatalogEntry[];
}

export interface ICatalogEntry {
  offerId: string;
  devName: string;
  offerType: IOfferType;
  prices: IPrice[];
  categories: string[];
  dailyLimit: number;
  weeklyLimit: number;
  monthlyLimit: number;
  appStoreId: string[];
  requirements: IRequirement[];
  metaInfo?: IMetaInfo[];
  catalogGroup?: string;
  catalogGroupPriority: number;
  sortPriority: number;
  title?: string;
  shortDescription?: ShortDescription;
  description?: string;
  displayAssetPath?: string;
  itemGrants: ItemGrant[];
  metaAssetInfo?: IMetaAssetInfo;
  fulfillmentIds?: any[];
  matchFilter?: string;
  filterWeight?: number;
  giftInfo?: IGiftInfo;
  refundable?: boolean;
}

export interface IGiftInfo {
  bIsEnabled: boolean;
  forcedGiftBoxTemplateId: string;
  purchaseRequirements: any[];
  giftRecordIds: any[];
}

export interface ItemGrant {
  templateId: string;
  quantity: number;
  attributes?: IAttributes;
}

export interface IAttributes {
  Alteration: IAlteration;
}

export interface IAlteration {
  LootTierGroup: string;
  Tier: number;
}

export interface IMetaAssetInfo {
  structName: StructName;
  payload: IPayload;
}

export interface IPayload {
  chaseItems: string[];
  packDefinition: string;
}

export enum StructName {
  FortCatalogMeta = 'FortCatalogMeta'
}

export interface IMetaInfo {
  key: string;
  value: string;
}

export enum IOfferType {
  StaticPrice = 'StaticPrice'
}

export interface IPrice {
  currencyType: CurrencyType;
  currencySubType: string;
  regularPrice: number;
  finalPrice: number;
  saleType?: string;
  saleExpiration: string;
  basePrice: number;
}

export enum CurrencyType {
  GameItem = 'GameItem',
  MtxCurrency = 'MtxCurrency',
  RealMoney = 'RealMoney'
}

export interface IRequirement {
  requirementType: RequirementType;
  requiredId: string;
  minQuantity: number;
}

export enum RequirementType {
  DenyOnFulfillment = 'DenyOnFulfillment',
  DenyOnItemOwnership = 'DenyOnItemOwnership',
  RequireFulfillment = 'RequireFulfillment',
  RequireItemOwnership = 'RequireItemOwnership'
}

export enum ShortDescription {
  BattlePass25Tiers = 'Battle Pass + 25 tiers!',
  Empty = '',
  Season5 = 'Season 5',
  Season6 = 'Season 6'
}
