import { classToPlain, plainToClass } from 'class-transformer';

export class LeaderboardStatsItem {
  public accountId: string;
  public value: number;
  public rank: number;

  public static FROM_JSON(jsonObject: {}): LeaderboardStatsItem {
    return plainToClass(LeaderboardStatsItem, jsonObject);
  }

  public toJson(): ILeaderboardStatsItem {
    return <ILeaderboardStatsItem>classToPlain(this);
  }
}

export interface ILeaderboardStatsItem {
  accountId: string;
  value: number;
  rank: number;
}
