import { expect } from 'chai';
import { describe, it } from 'mocha';
import { GroupType, Leaderboard, LeaderboardStatsItem, LeaderboardType, Platform, TimeWindow } from '../../src/index';
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
      0,
      100
    );
    expect(r.statWindow).to.be.a('string');
    expect(r.entries.length).to.be.equal(100);
  }).timeout(6 * 1000);

  // tslint:disable-next-line:mocha-no-side-effect-code
  it('should return the global wins leaderboards with (-de)serialization', async () => {
    const r: Leaderboard = await api.getLeaderboards(
      LeaderboardType.Wins,
      Platform.PC,
      GroupType.Solo,
      TimeWindow.Weekly,
      0,
      100
    );
    const json: {} = r.toJson();
    expect(json).to.be.an('object');
    const deserialized: Leaderboard = Leaderboard.FROM_JSON(json);
    expect(deserialized).to.be.an.instanceof(Leaderboard);
  }).timeout(6 * 1000);

  // tslint:disable-next-line:mocha-no-side-effect-code
  it('should return a stats item with (-de)serialization', async () => {
    const r: Leaderboard = await api.getLeaderboards(
      LeaderboardType.Wins,
      Platform.PC,
      GroupType.Solo,
      TimeWindow.Weekly,
      0,
      100
    );
    const item: LeaderboardStatsItem = r.entries[0];
    const json: {} = item.toJson();
    expect(json).to.be.an('object');
    const deserialized: LeaderboardStatsItem = LeaderboardStatsItem.FROM_JSON(json);
    expect(deserialized).to.be.an.instanceof(LeaderboardStatsItem);
  }).timeout(6 * 1000);
});
