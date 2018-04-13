import { expect } from 'chai';
import { describe, it } from 'mocha';
import { FortniteClient, IFortniteClientCredentials, Lookup } from '../../src/index';
import { api } from './init.spec';

describe('Lookup method', () => {
  before(async () => {
    await api.login();
  });

  // tslint:disable-next-line:mocha-no-side-effect-code
  it("should return skynewz's id and displayname", async () => {
    const r: Lookup = await api.lookup('skynewz');
    expect(r).to.be.an('object');
    expect(r.id).to.be.equal('8b057df0e63744f38962f3c7635674b4');
    expect(r.displayName).to.be.equal('SkYNewZ');
  }).timeout(6 * 1000);
});
