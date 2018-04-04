import { Expose, plainToClass, Type } from 'class-transformer';
import { Alteration } from './alteration';

export class Attributes {
  @Expose({ name: 'Alteration' })
  @Type(() => Alteration)
  public alteration: Alteration;

  public static FROM_JSON(jsonObject: {}): Attributes {
    return plainToClass(Attributes, jsonObject);
  }
}
