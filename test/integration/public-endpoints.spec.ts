import { expect } from 'chai';
import { describe, it } from 'mocha';
import { FortniteClient, ICheckStatus, IGameNews } from '../../src/index';

describe('Get return from public endpoints', () => {
  // tslint:disable-next-line:mocha-no-side-effect-code
  it('should get the fortnite service status', async () => {
    const response: ICheckStatus[] = await FortniteClient.CHECK_STATUS();
    expect(response).to.be.an('array');

    const entry: ICheckStatus = response[0];
    expect(entry).to.be.an('object');
    expect(entry.status).to.be.a('string');
    expect(entry.serviceInstanceId).to.be.equal('fortnite');
  }).timeout(6 * 1000);

  // tslint:disable-next-line:mocha-no-side-effect-code
  it('should get the fortnite game news', async () => {
    const r: IGameNews = await FortniteClient.GET_GAME_NEWS();
    expect(r).to.be.an('object');
    expect(r._locale).to.equal('en-US');
    expect(r.loginmessage._title).to.equal('LoginMessage');
    expect(r.savetheworldnews._title).to.equal('SaveTheWorldNews');
    expect(r.battleroyalenews._title).to.equal('battleroyalenews');
    expect(r.survivalmessage._title).to.equal('survivalmessage');
    expect(r.loginmessage._title).to.equal('LoginMessage');
  }).timeout(6 * 1000);
});
