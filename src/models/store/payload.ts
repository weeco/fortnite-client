import { classToPlain, plainToClass } from 'class-transformer';

export class Payload {
  public chaseItems: string[];
  public packDefinition: string;

  public static FROM_JSON(jsonObject: {}): Payload {
    return plainToClass(Payload, jsonObject);
  }

  public toJson(): {} {
    return classToPlain(this);
  }
}
