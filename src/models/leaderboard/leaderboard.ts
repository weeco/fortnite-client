import { classToPlain, plainToClass, Type } from 'class-transformer';
import { TimeWindow } from '../../enums/time-window.enum';
import { LeaderboardStatsItem } from './leaderboard-stats-item';

export class Leaderboard {
  public statName: string;
  public statWindow: TimeWindow;

  @Type(() => LeaderboardStatsItem)
  public entries: LeaderboardStatsItem[];

  public static FROM_JSON(jsonObject: {}): Leaderboard {
    return plainToClass(Leaderboard, jsonObject);
  }

  /* istanbul ignore next */
  public toJson(): {} {
    return classToPlain(this);
  }
}
