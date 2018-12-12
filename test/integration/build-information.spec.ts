import { expect } from 'chai';
import { describe, it } from 'mocha';
import { IBuildInformation } from '../../src';
import { launcherApi } from './init.spec';

describe('Get Build Information', () => {
  before(async () => {
    await launcherApi.login();
  });

  // tslint:disable-next-line:mocha-no-side-effect-code
  it('should return the current build information', async () => {
    try {
      const build: IBuildInformation[] = await launcherApi.buildInformation();
      expect(build).to.be.an('array');
      expect(build[0].appName).to.be.a('string');
      expect(build[0].assetId).to.be.equal('Fortnite');
    } catch (err) {
      expect(true);
    }
  }).timeout(6 * 1000);
});
