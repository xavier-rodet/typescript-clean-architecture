import { IConfig } from "./_definitions/IConfig";
import { Uid } from "@frameworks/uid";

const uid = new Uid();

const config: IConfig = {
  client: `${process.env.APP_NAME}-${uid.generate()}`,
  group: process.env.APP_NAME || "",
  host: process.env.BROKER_HOST || "",
  port: process.env.BROKER_PORT ? parseInt(process.env.BROKER_PORT) : 0,
};

export { config };
