import { classToPlain, plainToClass } from 'class-transformer';
import { TimeWindow } from '../../enums/time-window.enum';

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
  public toJson(): IStatsItem {
    return <IStatsItem>classToPlain(this);
  }
}

export interface IStatsItem {
  name: string;
  value: number;
  window: TimeWindow;
  ownerType: number;
}
