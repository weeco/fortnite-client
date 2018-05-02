import { expect } from 'chai';
import { describe, it } from 'mocha';
import { GroupType } from '../../src/enums/group-type.enum';
import { LeaderboardType } from '../../src/enums/leaderboard-type.enum';
import { Platform } from '../../src/enums/platform.enum';
import { TimeWindow } from '../../src/enums/time-window.enum';
import { FortniteClient, IFortniteClientCredentials, Lookup } from '../../src/index';
import { Leaderboard } from '../../src/models/leaderboard/leaderboard';
import { api } from './init.spec';

describe('Leaderboards method', () => {
  before(async () => {
    await api.login();
  });

  // tslint:disable-next-line:mocha-no-side-effect-code
  it('should return the global wins leaderboards', async () => {
    const r: Leaderboard = await api.getLeaderboards(
      LeaderboardType.Wins,
      Platform.PC,
      GroupType.Solo,
      TimeWindow.Weekly,
      100
    );
    expect(r.statWindow).to.be.a('string');
    expect(r.entries.length).to.be.equal(100);
  }).timeout(6 * 1000);
});
