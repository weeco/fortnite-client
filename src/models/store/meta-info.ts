import { plainToClass } from 'class-transformer';

export class MetaInfo {
  public key: Key;
  public value: string;

  public static FROM_JSON(jsonObject: {}): MetaInfo {
    return plainToClass(MetaInfo, jsonObject);
  }
}

export enum Key {
  BUseSharedDisplay = 'bUseSharedDisplay',
  BUseUpgradeDisplay = 'bUseUpgradeDisplay',
  BannerOverride = 'BannerOverride',
  EventLimit = 'EventLimit',
  GiftBox = 'gift_box',
  MtxBonus = 'MtxBonus',
  MtxQuantity = 'MtxQuantity',
  PurchaseLimitingEventID = 'PurchaseLimitingEventId',
  RequiredTag = 'RequiredTag',
  SharedDisplayPriority = 'SharedDisplayPriority'
}
