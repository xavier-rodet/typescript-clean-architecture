import { IConfig } from "./_definitions/IConfig";

const config: IConfig = {
  key: process.env.LOGGER_API_KEY || "",
  options: {
    app: process.env.APP_NAME || "",
    env: process.env.ENV || "",
  },
};

export { config };
