import { classToPlain, plainToClass } from 'class-transformer';

export class LeaderboardStatsItem {
  public accountId: string;
  public value: number;
  public rank: number;

  public static FROM_JSON(jsonObject: {}): LeaderboardStatsItem {
    return plainToClass(LeaderboardStatsItem, jsonObject);
  }

  public toJson(): {} {
    return classToPlain(this);
  }
}
