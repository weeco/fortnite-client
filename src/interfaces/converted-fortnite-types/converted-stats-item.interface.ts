import { GroupTypeConverted } from '../../enums/group-type.enum';
import { Platform } from '../../enums/platform.enum';
import { StatsTypeConverted } from '../../enums/stats-type.enum';

export type CustomProperty = {
  timeWindow: string;
};

export type IPlayerStatsPlatformEntry = { [K in StatsTypeConverted]: number };
export type IPlayerStats = { stats: { [K in Platform]?: IPlayerGroupTypedStats } } & CustomProperty;
export type IPlayerGroupTypedStats = { [K in GroupTypeConverted]?: IPlayerStatsPlatformEntry };
