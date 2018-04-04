import { plainToClass, Type } from 'class-transformer';
import { Payload } from './payload';

export class MetaAssetInfo {
  public structName: StructName;

  @Type(() => Payload)
  public payload: Payload;

  public static FROM_JSON(jsonObject: {}): MetaAssetInfo {
    return plainToClass(MetaAssetInfo, jsonObject);
  }
}

export enum StructName {
  FortCatalogMeta = 'FortCatalogMeta'
}
