import { expect } from 'chai';
import { config } from 'dotenv';
import { describe, it } from 'mocha';
import { FortniteClient } from '../src/fortnite-client';
import { IFortniteClientCredentials } from '../src/interfaces/fortnite-client-credentials.interface';
import { Lookup } from '../src/models/lookup/lookup';

config();
const credentials: IFortniteClientCredentials = {
  email: process.env.FORTNITE_ACCOUNT_EMAIL,
  password: process.env.FORTNITE_ACCOUNT_PASSWORD,
  clientLauncherToken: process.env.FORTNITE_ACCOUNT_CLIENT_LAUNCHER_TOKEN,
  clientToken: process.env.FORTNITE_ACCOUNT_CLIENT_TOKEN
};

describe('Lookup method', () => {

    let api: FortniteClient = null;

    before(() => {
        api = new FortniteClient(credentials);
        api.login();
    });

    it('should return skynewz profile', () => {
        const r: Promise<Lookup> = api.lookup('skynewz');
        expect(r).to.be.an('object');
    });
});
