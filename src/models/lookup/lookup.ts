import { classToPlain, plainToClass } from 'class-transformer';

export class Lookup {
  public id: string;
  public displayName: string;

  public static FROM_JSON(jsonObject: {}): Lookup {
    return plainToClass(Lookup, jsonObject);
  }

  /* istanbul ignore next */
  public toJson(): ILookup {
    return <ILookup>classToPlain(this);
  }
}

export interface ILookup {
  id: string;
  displayName: string;
}
