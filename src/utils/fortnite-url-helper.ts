import { GroupType } from '../enums/group-type.enum';
import { LeaderboardType } from '../enums/leaderboard-type.enum';
import { Platform } from '../enums/platform.enum';
import { TimeWindow } from '../enums/time-window.enum';

// tslint:disable-next-line:no-unnecessary-class
export class FortniteURLHelper {
  // Base URLs
  public static readonly lightSwitchUrl: string = 'https://lightswitch-public-service-prod06.ol.epicgames.com/lightswitch/api';
  public static readonly accountPublicUrl: string = 'https://account-public-service-prod03.ol.epicgames.com/account/api';
  public static readonly leaderboardsPublicUrl: string = 'https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api';
  public static readonly launcherPublicUrl: string = 'https://launcher-public-service-prod06.ol.epicgames.com/launcher/api';
  public static readonly contentPublicUrl: string = 'https://fortnitecontent-website-prod07.ol.epicgames.com/content/api';
  public static readonly gameApiV2: string = 'https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api/game/v2';
  public static readonly personaApi: string = 'https://persona-public-service-prod06.ol.epicgames.com/persona/api';
  public static readonly storeFrontV2: string = 'https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api/storefront/v2';
  public static readonly stats: string = 'https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api/stats';
  public static readonly friendsPublicUrl: string = 'https://friends-public-service-prod06.ol.epicgames.com/friends/api';

  // Request URLs
  public static gameNews: string = `${FortniteURLHelper.contentPublicUrl}/pages/fortnite-game`;
  public static oAuthToken: string = `${FortniteURLHelper.accountPublicUrl}/oauth/token`;
  public static oAuthExchange: string = `${FortniteURLHelper.accountPublicUrl}/oauth/exchange`;
  public static serviceStatus: string = `${FortniteURLHelper.lightSwitchUrl}/service/bulk/status?serviceId=Fortnite`;
  public static lookup: string = `${FortniteURLHelper.personaApi}/public/account/lookup`;
  public static store: string = `${FortniteURLHelper.storeFrontV2}/catalog`;
  public static killOtherSessions: string = `${
    FortniteURLHelper.accountPublicUrl
  }/oauth/sessions/kill?killType=OTHERS_ACCOUNT_CLIENT_SERVICE`;
  public static sendFriendRequest: string = 'https://accounts.launcher-website-prod07.ol.epicgames.com/launcher/sendFriendRequest';
  public static buildVersion: string = `${FortniteURLHelper.launcherPublicUrl}/public/assets`;

  public static GET_PLAYER_PROFILE_REQUEST_URL(userId: string, timeWindow: TimeWindow): string {
    return `${FortniteURLHelper.stats}/accountId/${userId}/bulk/window/${timeWindow}`;
  }

  public static GET_LIST_FRIENDS_URL(userId: string): string {
    return `${FortniteURLHelper.friendsPublicUrl}/public/friends/${userId}`;
  }

  public static GET_LEADERBOARDS_URL(
    leaderboardType: LeaderboardType,
    platform: Platform,
    groupType: GroupType,
    timeWindow: TimeWindow
  ): string {
    return `${
      FortniteURLHelper.leaderboardsPublicUrl
    }/leaderboards/type/global/stat/br_${leaderboardType}_${platform}_m0_${groupType}/window/${timeWindow}`;
  }
}
