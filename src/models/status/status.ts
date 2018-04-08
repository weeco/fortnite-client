import { classToPlain, plainToClass, Type } from 'class-transformer';
import { LauncherInfo } from './launcher-info';

export class Status {
  public serviceInstanceId: string;
  public status: string;
  public message: number;
  public maintenanceUri?: string;
  public overrideCatalogIds: string[];
  public allowedActions: string[];
  public banned: boolean;

  @Type(() => LauncherInfo)
  public launcherInfo: LauncherInfo;

  public static FROM_JSON(jsonObject: {}): Status {
    return plainToClass(Status, jsonObject);
  }

  public toJson(): {} {
    return classToPlain(Status);
  }
}
