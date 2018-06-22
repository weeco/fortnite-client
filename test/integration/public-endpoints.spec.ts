import { expect } from 'chai';
import { describe, it } from 'mocha';
import { FortniteClient, Status, Welcome } from '../../src/index';

describe('Get return from public endpoints', () => {
  // tslint:disable-next-line:mocha-no-side-effect-code
  it('should get the fortnite service status', async () => {
    const r: Status = await FortniteClient.CHECK_STATUS();
    expect(r).to.be.an('object');
    expect(r.status).to.be.a('string');
    expect(r.serviceInstanceId).to.be.equal('fortnite');
  }).timeout(6 * 1000);

  // tslint:disable-next-line:mocha-no-side-effect-code
  it('should get the fortnite game news', async () => {
    const r: Welcome = await FortniteClient.GET_GAME_NEWS();
    expect(r).to.be.an('object');
    expect(r.locale).to.equal('en-US');
    expect(r.loginmessage.title).to.equal('LoginMessage');
    expect(r.savetheworldnews.title).to.equal('SaveTheWorldNews');
    expect(r.battleroyalenews.title).to.equal('battleroyalenews');
    expect(r.survivalmessage.title).to.equal('survivalmessage');
    expect(r.loginmessage.title).to.equal('LoginMessage');
  }).timeout(6 * 1000);
});
