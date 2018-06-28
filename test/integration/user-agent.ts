import { expect } from 'chai';
import { describe, it } from 'mocha';
import { BuildInformation } from '../../src';
import { launcherApi } from './init.spec';

describe('Lookup method', () => {
  before(async () => {
    await launcherApi.login();
  });

  // tslint:disable-next-line:mocha-no-side-effect-code
  it("should return fortnite's current build information", async () => {
    const buildInformation: BuildInformation = await launcherApi.buildInformation();
    expect(buildInformation.appName).to.be.equal('Fortnite');
    expect(buildInformation.labelName).to.be.equal('Live-Windows');
  }).timeout(6 * 1000);
});
