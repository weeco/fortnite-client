import { config } from 'dotenv';
import { FortniteClient, IFortniteClientCredentials, IProxyOptions, LauncherClient } from '../../src';

config();

// Parse Proxy configuration
let proxy: IProxyOptions = null;
const isProxyEnabled: boolean = process.env.PROXY_ENABLED ? process.env.PROXY_ENABLED.toLowerCase() === 'true' : false;
if (isProxyEnabled) {
  proxy = {
    host: process.env.PROXY_HOST,
    port: Number(process.env.PROXY_PORT)
  };
}

const credentials: IFortniteClientCredentials = {
  email: process.env.FORTNITE_ACCOUNT_EMAIL,
  password: process.env.FORTNITE_ACCOUNT_PASSWORD
};

export const api: FortniteClient = new FortniteClient(credentials, { proxy });
export const launcherApi: LauncherClient = new LauncherClient(credentials, { proxy });
