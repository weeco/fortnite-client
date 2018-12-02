import { expect } from 'chai';
import { describe, it } from 'mocha';
import { IPlayerStats } from '../../src';
import { api } from './init.spec';

describe('Get Battle Royale stats', () => {
  before(async () => {
    await api.login();
  });

  // tslint:disable-next-line:mocha-no-side-effect-code
  it("should return skynewz's battle royale stats", async () => {
    const r: IPlayerStats = await api.getBattleRoyaleStatsById('8b057df0e63744f38962f3c7635674b4');
    expect(r).to.be.an('object');
    expect(r.timeWindow).to.be.a('string');
    expect(r.stats).to.be.an('object');
    expect(r.stats.allPlatforms).to.be.an('object');
    expect(r.stats.allPlatforms.allGroupTypes.kills).to.be.a('number');
    expect(r.stats.allPlatforms.solo.kills).to.be.a('number');
    expect(r.stats.pc).to.be.an('object');
    expect(r.stats.pc).to.be.an('object');
    expect(r.stats.pc.solo).to.be.an('object');
    expect(r.stats.pc.allGroupTypes.kills).to.be.a('number');
    expect(r.stats.pc.solo.kills).to.be.a('number');
    expect(r.stats.pc.duo).to.be.an('object');
    expect(r.stats.pc.squad).to.be.an('object');
    expect(r.stats.xb1).to.be.an('object');
    expect(r.stats.ps4).to.be.an('object');
  }).timeout(6 * 1000);
});
