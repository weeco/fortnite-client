import { config } from 'dotenv';
import { FortniteClient, IFortniteClientCredentials, IProxyOptions } from '../../src';

config();

// Parse Proxy configuration
let proxy: IProxyOptions = null;
const isProxyEnabled: boolean = process.env.PROXY_ENABLED.toLowerCase() === 'true';
if (isProxyEnabled) {
  proxy = {
    host: process.env.PROXY_HOST,
    port: Number(process.env.PROXY_PORT)
  };
}

const credentials: IFortniteClientCredentials = {
  email: process.env.FORTNITE_ACCOUNT_EMAIL,
  password: process.env.FORTNITE_ACCOUNT_PASSWORD,
  clientLauncherToken: process.env.FORTNITE_ACCOUNT_CLIENT_LAUNCHER_TOKEN,
  clientToken: process.env.FORTNITE_ACCOUNT_CLIENT_TOKEN
};

export const api: FortniteClient = new FortniteClient(credentials, { proxy });
