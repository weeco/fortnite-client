import { classToPlain, plainToClass } from 'class-transformer';

export class LauncherInfo {
  public appName: string;
  public catalogItemId: string;
  public namespace: string;

  public static FROM_JSON(jsonObject: {}): LauncherInfo {
    return plainToClass(LauncherInfo, jsonObject);
  }

  public toJson(): {} {
    return classToPlain(LauncherInfo);
  }
}
