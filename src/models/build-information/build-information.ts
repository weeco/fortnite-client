import { classToPlain, plainToClass } from 'class-transformer';

export class BuildInformation {
  public appName: string;
  public labelName: string;
  public buildVersion: string;
  public catalogItemId: string;
  public namespace: string;
  public assetId: string;

  public static FROM_JSON(jsonObject: {}): BuildInformation {
    return plainToClass(BuildInformation, jsonObject);
  }

  /* istanbul ignore next */
  public toJson(): {} {
    return classToPlain(this);
  }
}
