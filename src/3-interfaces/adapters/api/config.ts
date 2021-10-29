import { IConfig } from "./_definitions/IConfig";
import { resolve } from "path";

const config: IConfig = {
  definitionsPath: resolve(process.cwd(), "dist/swagger.json"),
  corsAllowOrigin: process.env.CORS_ALLOW_ORIGIN || "",
};

export { config };
