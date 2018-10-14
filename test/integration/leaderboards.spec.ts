import { expect } from 'chai';
import { describe, it } from 'mocha';
import { GroupType, ILeaderboardEntry, ILeaderboards, LeaderboardType, Platform, TimeWindow } from '../../src/index';
import { api } from './init.spec';

describe('Leaderboards method', () => {
  before(async () => {
    await api.login();
  });

  // tslint:disable-next-line:mocha-no-side-effect-code
  it('should return the global wins leaderboards', async () => {
    const r: ILeaderboards = await api.getLeaderboards(
      LeaderboardType.Wins,
      Platform.PC,
      GroupType.Solo,
      TimeWindow.Weekly,
      0,
      100
    );
    expect(r.statName).to.be.equal('br_placetop1_pc_m0_p2');
    expect(r.statWindow).to.be.equal('weekly');
    expect(r.entries.length).to.be.equal(100);

    const statItem: ILeaderboardEntry = r.entries[0];
    expect(statItem.accountId).to.be.a('string');
    expect(statItem.name).to.be.a('string');
    expect(statItem.value).to.be.a('number');
    expect(statItem.rank).to.be.a('number');
  }).timeout(6 * 1000);
});
