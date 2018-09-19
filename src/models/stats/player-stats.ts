import { classToPlain, plainToClass, Type } from 'class-transformer';
import { IStatsItem, StatsItem } from './stats-item';

export class PlayerStats {
  @Type(() => StatsItem)
  public stats: StatsItem[];

  public static FROM_JSON(jsonObject: {}): PlayerStats {
    return plainToClass(PlayerStats, jsonObject);
  }

  /* istanbul ignore next */
  public toJson(): IStatsItem[] {
    return <IStatsItem[]>classToPlain(this);
  }
}

export interface IPlayerStatsPrepared {
  stats: IStatsItem[];
}
