import { classToPlain, plainToClass } from 'class-transformer';

export class Lookup {
  public id: string;
  public displayName: string;

  public static FROM_JSON(jsonObject: {}): Lookup {
    return plainToClass(Lookup, jsonObject);
  }

  /* istanbul ignore next */
  public toJson(): {} {
    return classToPlain(this);
  }
}
