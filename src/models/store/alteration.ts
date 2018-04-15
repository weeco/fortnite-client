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
  public toJson(): {} {
    return classToPlain(this);
  }
}
