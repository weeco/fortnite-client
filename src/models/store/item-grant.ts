import { classToPlain, plainToClass, Type } from 'class-transformer';
import { Attributes } from './attributes';

export class ItemGrant {
  public templateId: string;
  public quantity: number;

  @Type(() => Attributes)
  public attributes?: Attributes;

  /* istanbul ignore next */
  public static FROM_JSON(jsonObject: {}): ItemGrant {
    return plainToClass(ItemGrant, jsonObject);
  }

  /* istanbul ignore next */
  public toJson(): {} {
    return classToPlain(this);
  }
}
