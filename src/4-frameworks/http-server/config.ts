import { IConfig } from "./_definitions/IConfig";

const config: IConfig = {
  port: process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 0,
  env: process.env.ENV || "",
};

export { config };
