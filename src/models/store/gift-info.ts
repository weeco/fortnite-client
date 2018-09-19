import { classToPlain, plainToClass } from 'class-transformer';

export class GiftInfo {
  public bIsEnabled: boolean;
  public forcedGiftBoxTemplateId: string;
  public purchaseRequirements: string[];
  public giftRecordIds?: string[];

  /* istanbul ignore next */
  public static FROM_JSON(jsonObject: {}): GiftInfo {
    return plainToClass(GiftInfo, jsonObject);
  }

  /* istanbul ignore next */
  public toJson(): IGiftInfo {
    return <IGiftInfo>classToPlain(this);
  }
}

export interface IGiftInfo {
  bIsEnabled: boolean;
  forcedGiftBoxTemplateId: string;
  purchaseRequirements: string[];
  giftRecordIds?: string[];
}
