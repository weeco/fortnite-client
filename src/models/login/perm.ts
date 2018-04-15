import { classToPlain, plainToClass } from 'class-transformer';

/* istanbul ignore next */
export class Perm {
  public resource: string;
  public action: number;

  public static FROM_JSON(jsonObject: {}): Perm {
    return plainToClass(Perm, jsonObject);
  }

  /* istanbul ignore next */
  public toJson(): {} {
    return classToPlain(this);
  }
}
