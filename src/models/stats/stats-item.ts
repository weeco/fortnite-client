import { classToPlain, plainToClass } from 'class-transformer';

export class StatsItem {
  public name: string;
  public value: number;
  public window: TimeWindow;
  public ownerType: number;

  /* istanbul ignore next */
  public static FROM_JSON(jsonObject: {}): StatsItem {
    return plainToClass(StatsItem, jsonObject);
  }

  /* istanbul ignore next */
  public toJson(): {} {
    return classToPlain(this);
  }
}

export enum TimeWindow {
  Alltime = 'alltime'
}
