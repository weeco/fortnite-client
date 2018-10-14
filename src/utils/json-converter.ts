import { GroupTypeConverted } from '../enums/group-type.enum';
import { Platform } from '../enums/platform.enum';
import { StatsType, StatsTypeConverted } from '../enums/stats-type.enum';
import { IPlayerStats } from '../interfaces/converted-fortnite-types/converted-stats-item.interface';
import { IStatsItem } from '../interfaces/fortnite-types/stats-item.interface';

export namespace JSONConvert {
  export function convertPlayerStats(stats: IStatsItem[]): IPlayerStats {
    const playerStats: RecursivePartial<IPlayerStats> = {
      stats: {
        pc: {},
        ps4: {},
        xb1: {}
      }
    };
    stats.forEach((statsItem: IStatsItem) => {
      const statsMetaInfo: IParsedDetails = parseDetailsFromStatsName(statsItem.name);

      // Sets timewindow and value (e. g. { timeWindow: "alltime", stats: { pc: {solo: { kills: 5 }} })
      playerStats.timeWindow = statsItem.window;

      // Create nested objects if they don't exist yet
      if (playerStats.stats[statsMetaInfo.platform][statsMetaInfo.groupType] == null) {
        playerStats.stats[statsMetaInfo.platform][statsMetaInfo.groupType] = {};
      }

      playerStats.stats[statsMetaInfo.platform][statsMetaInfo.groupType][statsMetaInfo.statsType] = statsItem.value;
    });

    return <IPlayerStats>playerStats;
  }

  function parseDetailsFromStatsName(name: string): IParsedDetails {
    // @ts-ignore: Unused variable
    const [statsType, platform, unknown, groupType] = name.replace('br_', '').split('_');
    const enumKey: keyof typeof GroupTypeConverted = <keyof typeof GroupTypeConverted>groupType;

    // Get proper converted key name for statsType
    let statsTypePropertyName: StatsTypeConverted;
    Object.keys(StatsType).forEach((key: keyof typeof StatsTypeConverted) => {
      if (statsType === StatsType[key]) {
        statsTypePropertyName = StatsTypeConverted[key];
      }
    });

    return {
      statsType: statsTypePropertyName,
      platform: <Platform>platform,
      groupType: GroupTypeConverted[enumKey]
    };
  }
}

interface IParsedDetails {
  statsType: StatsTypeConverted;
  platform: Platform;
  groupType: GroupTypeConverted;
}

type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> };
