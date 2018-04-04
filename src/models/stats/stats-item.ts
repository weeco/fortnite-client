import { plainToClass } from 'class-transformer';

export class StatsItem {
  public name: string;
  public value: number;
  public window: TimeWindow;
  public ownerType: number;

  public static FROM_JSON(jsonObject: {}): StatsItem {
    return plainToClass(StatsItem, jsonObject);
  }
}

export enum TimeWindow {
  Alltime = 'alltime'
}
