import { IConfig } from "./_definitions/IConfig";

const appName = process.env.APP_NAME ?? "";
const env = process.env.ENV ?? "";
const apiKey = process.env.LOGGER_API_KEY ?? "";

const config: IConfig = {
  apiKey,
  options: {
    appName,
    env,
  },
};

export { config };
