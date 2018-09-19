import { classToPlain, Expose, plainToClass } from 'class-transformer';

export class Alteration {
  @Expose({ name: 'LootTierGroup' })
  public lootTierGroup: string;

  @Expose({ name: 'Tier' })
  public tier: number;

  /* istanbul ignore next */
  public static FROM_JSON(jsonObject: {}): Alteration {
    return plainToClass(Alteration, jsonObject);
  }

  /* istanbul ignore next */
  public toJson(): IAlteration {
    return <IAlteration>classToPlain(this);
  }
}

export interface IAlteration {
  LootTierGroup: string;
  Tier: number;
}
