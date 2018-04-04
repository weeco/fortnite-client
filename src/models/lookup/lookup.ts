import { plainToClass } from 'class-transformer';

export class Lookup {
  public id: string;
  public displayName: string;

  public static FROM_JSON(jsonObject: {}): Lookup {
    return plainToClass(Lookup, jsonObject);
  }
}
