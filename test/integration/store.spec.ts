import { expect } from 'chai';
import { describe, it } from 'mocha';
import { IStore } from '../../src';
import { api } from './init.spec';

describe('Get store', () => {
  before(async () => {
    await api.login();
  });

  // tslint:disable-next-line:mocha-no-side-effect-code
  it('should return the fortnite store', async () => {
    const r: IStore = await api.getStore();
    expect(r).to.be.an('object');
    expect(r.dailyPurchaseHrs).to.be.a('number');
    expect(r.refreshIntervalHrs).to.be.a('number');
  }).timeout(6 * 1000);
});
