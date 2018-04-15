import { classToPlain, Expose, plainToClass, Type } from 'class-transformer';
import { Alteration } from './alteration';

export class Attributes {
  @Expose({ name: 'Alteration' })
  @Type(() => Alteration)
  public alteration: Alteration;

  /* istanbul ignore next */
  public static FROM_JSON(jsonObject: {}): Attributes {
    return plainToClass(Attributes, jsonObject);
  }

  /* istanbul ignore next */
  public toJson(): {} {
    return classToPlain(this);
  }
}
