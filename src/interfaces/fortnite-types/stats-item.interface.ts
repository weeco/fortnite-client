import { TimeWindow } from '../../enums/time-window.enum';

export interface IStatsItem {
  name: string;
  value: number;
  window: TimeWindow;
  ownerType: number;
}
