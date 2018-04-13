import { config } from 'dotenv';
import { FortniteClient, IFortniteClientCredentials } from '../../src';

config();
const credentials: IFortniteClientCredentials = {
  email: process.env.FORTNITE_ACCOUNT_EMAIL,
  password: process.env.FORTNITE_ACCOUNT_PASSWORD,
  clientLauncherToken: process.env.FORTNITE_ACCOUNT_CLIENT_LAUNCHER_TOKEN,
  clientToken: process.env.FORTNITE_ACCOUNT_CLIENT_TOKEN
};

export const api: FortniteClient = new FortniteClient(credentials);
