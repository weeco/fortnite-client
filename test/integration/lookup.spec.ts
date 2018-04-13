import { expect } from 'chai';
import { config } from 'dotenv';
import { describe, it } from 'mocha';
import { FortniteClient, IFortniteClientCredentials, Lookup } from '../../src/index';

config();
const credentials: IFortniteClientCredentials = {
  email: process.env.FORTNITE_ACCOUNT_EMAIL,
  password: process.env.FORTNITE_ACCOUNT_PASSWORD,
  clientLauncherToken: process.env.FORTNITE_ACCOUNT_CLIENT_LAUNCHER_TOKEN,
  clientToken: process.env.FORTNITE_ACCOUNT_CLIENT_TOKEN
};

describe('Lookup method', () => {
  let api: FortniteClient = null;

  before(async () => {
    api = new FortniteClient(credentials);
    await api.login();
  });

  // tslint:disable-next-line:mocha-no-side-effect-code
  it("should return skynewz's profile", async () => {
    const r: Lookup = await api.lookup('skynewz');
    expect(r).to.be.an('object');
    expect(r.id).to.be.equal('8b057df0e63744f38962f3c7635674b4');
    expect(r.displayName).to.be.equal('SkYNewZ');
  }).timeout(6 * 1000);
});
