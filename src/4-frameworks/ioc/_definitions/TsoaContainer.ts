import Bottle from "bottlejs";
import { IocContainer } from "tsoa";

class TsoaContainer implements IocContainer {
  private iocContainer: Bottle.IContainer;

  constructor(iocContainer: Bottle.IContainer) {
    this.iocContainer = iocContainer;
  }

  get<T>(controller: { prototype: T; name: string }): T {
    return this.iocContainer[controller.name];
  }
}

export { TsoaContainer };
