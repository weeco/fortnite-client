import { classToPlain, plainToClass } from 'class-transformer';

export class Perm {
  public resource: string;
  public action: number;

  public static FROM_JSON(jsonObject: {}): Perm {
    return plainToClass(Perm, jsonObject);
  }

  public toJson(): {} {
    return classToPlain(Perm);
  }
}
