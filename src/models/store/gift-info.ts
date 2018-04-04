import { plainToClass } from 'class-transformer';

export class GiftInfo {
  public bIsEnabled: boolean;
  public forcedGiftBoxTemplateId: string;
  public purchaseRequirements: string[];
  public giftRecordIds?: string[];

  public static FROM_JSON(jsonObject: {}): GiftInfo {
    return plainToClass(GiftInfo, jsonObject);
  }
}
