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
  public toJson(): IBuildInformation {
    return <IBuildInformation>classToPlain(this);
  }
}

export interface IBuildInformation {
  appName: string;
  labelName: string;
  buildVersion: string;
  catalogItemId: string;
  namespace: string;
  assetId: string;
}
