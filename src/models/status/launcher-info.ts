import { classToPlain, plainToClass } from 'class-transformer';

export class LauncherInfo {
  public appName: string;
  public catalogItemId: string;
  public namespace: string;

  /* istanbul ignore next */
  public static FROM_JSON(jsonObject: {}): LauncherInfo {
    return plainToClass(LauncherInfo, jsonObject);
  }

  /* istanbul ignore next */
  public toJson(): {} {
    return classToPlain(this);
  }
}

export interface ILauncherInfo {
  appName: string;
  catalogItemId: string;
  namespace: string;
}
