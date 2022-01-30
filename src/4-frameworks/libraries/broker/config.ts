import { IUid } from '@entities/_common/libraries/uid';

export type TConfig = {
  client: string;
  group: string;
  host: string;
  port: number;
};

export function buildConfig(uid: IUid): TConfig {
  return {
    client: `${process.env.APP_NAME}-${uid.generate()}`,
    group: process.env.APP_NAME || '',
    host: process.env.BROKER_HOST || '',
    port: process.env.BROKER_PORT ? parseInt(process.env.BROKER_PORT) : 0,
  };
}
