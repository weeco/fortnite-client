import { classToPlain, plainToClass } from 'class-transformer';

export class Requirement {
  public requirementType: RequirementType;
  public requiredId: string;
  public minQuantity: number;

  public static FROM_JSON(jsonObject: {}): Requirement {
    return plainToClass(Requirement, jsonObject);
  }

  public toJson(): {} {
    return classToPlain(this);
  }
}

export enum RequirementType {
  DenyOnFulfillment = 'DenyOnFulfillment',
  DenyOnItemOwnership = 'DenyOnItemOwnership',
  RequireFulfillment = 'RequireFulfillment',
  RequireItemOwnership = 'RequireItemOwnership'
}
