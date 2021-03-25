import { IConfig } from "./_definitions/IConfig";
import { resolve } from "path";

const config: IConfig = {
  definitionsPath: resolve(process.cwd(), "dist/swagger.json"),
};

export { config };
