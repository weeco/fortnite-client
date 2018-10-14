export interface ILeaderboards {
  statName: string;
  statWindow: string;
  entries: ILeaderboardEntry[];
}

export interface ILeaderboardEntry {
  accountId: string;
  name: string;
  value: number;
  rank: number;
}
