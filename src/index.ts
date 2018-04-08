import { config } from 'dotenv';
// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
import { FortniteClient } from './fortnite-client';
import { IFortniteClientCredentials } from './interfaces/fortnite-client-credentials.interface';
// import { Status } from './models/status/status';

config();
const credentials: IFortniteClientCredentials = {
  email: process.env.FORTNITE_ACCOUNT_EMAIL,
  password: process.env.FORTNITE_ACCOUNT_PASSWORD,
  clientLauncherToken: process.env.FORTNITE_ACCOUNT_CLIENT_LAUNCHER_TOKEN,
  clientToken: process.env.FORTNITE_ACCOUNT_CLIENT_TOKEN
};

async function bootstrap(): Promise<void> {
  //const status: Status = await FortniteClient.CHECK_STATUS();

  const api: FortniteClient = new FortniteClient(credentials);
  await api.login();
}

bootstrap();
