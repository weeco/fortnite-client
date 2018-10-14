export interface ICheckStatus {
  serviceInstanceId: string;
  status: string;
  message: string;
  maintenanceUri: null;
  overrideCatalogIds: string[];
  allowedActions: string[];
  banned: boolean;
  launcherInfoDTO: ILauncherInfoDTO;
}

export interface ILauncherInfoDTO {
  appName: string;
  catalogItemId: string;
  namespace: string;
}
