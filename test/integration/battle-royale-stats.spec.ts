import { expect } from 'chai';
import { describe, it } from 'mocha';
import { FortniteClient, IFortniteClientCredentials, PlayerStats } from '../../src/index';
import { api } from './init.spec';

describe('Get Battle Royale stats', () => {
  before(async () => {
    await api.login();
  });

  // tslint:disable-next-line:mocha-no-side-effect-code
  it("should return skynewz's battle royale stats", async () => {
    const r: PlayerStats = await api.getBattleRoyaleStatsById('8b057df0e63744f38962f3c7635674b4');
    expect(r).to.be.an('object');
    expect(r.stats).length.to.be.gte(23);
    for (const statsItem of r.stats) {
      expect(statsItem.name).to.be.a('string');
      expect(statsItem.value).to.be.a('number');
      expect(statsItem.ownerType).to.be.equal(1);
      expect(statsItem.window).to.be.equal('alltime');
    }
  }).timeout(6 * 1000);
});
