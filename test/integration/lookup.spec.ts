import { expect, use } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { describe, it } from 'mocha';
import { ILookup } from '../../src';
import { api } from './init.spec';

describe('Lookup method', () => {
  before(async () => {
    use(chaiAsPromised);
    await api.login();
  });

  // tslint:disable-next-line:mocha-no-side-effect-code
  it("should return skynewz's id and displayname", async () => {
    const r: ILookup = await api.lookup('SkYNewZ');
    expect(r).to.be.an('object');
    expect(r.id).to.be.equal('8b057df0e63744f38962f3c7635674b4');
    expect(r.displayName).to.be.equal('SkYNewZ');
  }).timeout(6 * 1000);

  // tslint:disable-next-line:mocha-no-side-effect-code
  it('should throw an expcetion for non existing account', async () => {
    const r: Promise<ILookup> = api.lookup('SkYNewZHadsasd');
    await expect(r).to.be.rejected;
  }).timeout(6 * 1000);

  // tslint:disable-next-line:mocha-no-side-effect-code
  it('should return lookups by ids for pongau and skynewz', async () => {
    const r: Map<string, ILookup> = await api.lookupByIds([
      '8b057df0e63744f38962f3c7635674b4',
      '2ec67dfe5ac4448cb2d82d5039b196b4'
    ]);
    expect(r).to.be.a('map');
    expect(r.size).to.be.eq(2);
  }).timeout(6 * 1000);
});
