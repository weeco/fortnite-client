import { classToPlain, plainToClass } from 'class-transformer';

export class Requirement {
  public requirementType: RequirementType;
  public requiredId: string;
  public minQuantity: number;

  /* istanbul ignore next */
  public static FROM_JSON(jsonObject: {}): Requirement {
    return plainToClass(Requirement, jsonObject);
  }

  /* istanbul ignore next */
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
