import { GroupTypeConverted } from '../enums/group-type.enum';
import { Platform } from '../enums/platform.enum';
import { StatsType, StatsTypeConverted } from '../enums/stats-type.enum';
import { IPlayerStats } from '../interfaces/converted-fortnite-types/converted-stats-item.interface';
import { IStatsItem } from '../interfaces/fortnite-types/stats-item.interface';

export namespace JSONConvert {
  export function convertPlayerStats(stats: IStatsItem[]): IPlayerStats {
    const playerStats: RecursivePartial<IPlayerStats> = {
      stats: {
        allPlatforms: {},
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
      if (playerStats.stats[statsMetaInfo.platform].allGroupTypes == null) {
        playerStats.stats[statsMetaInfo.platform].allGroupTypes = {};
      }
      if (playerStats.stats.allPlatforms[statsMetaInfo.groupType] == null) {
        playerStats.stats.allPlatforms[statsMetaInfo.groupType] = {};
      }
      if (playerStats.stats.allPlatforms.allGroupTypes == null) {
        playerStats.stats.allPlatforms.allGroupTypes = {};
      }

      playerStats.stats[statsMetaInfo.platform][statsMetaInfo.groupType][statsMetaInfo.statsType] = statsItem.value;

      // Init property for platform "all" if non existent
      if (playerStats.stats.allPlatforms[statsMetaInfo.groupType][statsMetaInfo.statsType] == null) {
        playerStats.stats.allPlatforms[statsMetaInfo.groupType][statsMetaInfo.statsType] = 0;
      }
      if (playerStats.stats.allPlatforms.allGroupTypes[statsMetaInfo.statsType] == null) {
        playerStats.stats.allPlatforms.allGroupTypes[statsMetaInfo.statsType] = 0;
      }
      if (playerStats.stats[statsMetaInfo.platform].allGroupTypes[statsMetaInfo.statsType] == null) {
        playerStats.stats[statsMetaInfo.platform].allGroupTypes[statsMetaInfo.statsType] = 0;
      }
      // Sum all stats types for the "all" platform except lasModifiedAt
      if (statsMetaInfo.statsType === 'lastModifiedAt') {
        // Update lastModifiedAt only if this timestamp is at a later time than the previous value
        const previousValue: number = playerStats.stats.allPlatforms[statsMetaInfo.groupType][statsMetaInfo.statsType];
        if (statsItem.value > previousValue) {
          playerStats.stats.allPlatforms[statsMetaInfo.groupType][statsMetaInfo.statsType] = statsItem.value;
        }

        // Same for allGroupTypes aggregation
        const previousValueGroupTypes: number =
          playerStats.stats[statsMetaInfo.platform].allGroupTypes[statsMetaInfo.statsType];
        if (statsItem.value > previousValueGroupTypes) {
          playerStats.stats[statsMetaInfo.platform].allGroupTypes[statsMetaInfo.statsType] = statsItem.value;
        }
      } else {
        playerStats.stats.allPlatforms[statsMetaInfo.groupType][statsMetaInfo.statsType] += statsItem.value;
        playerStats.stats.allPlatforms.allGroupTypes[statsMetaInfo.statsType] += statsItem.value;
        playerStats.stats[statsMetaInfo.platform].allGroupTypes[statsMetaInfo.statsType] += statsItem.value;
      }
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
