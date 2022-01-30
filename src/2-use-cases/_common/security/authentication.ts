import { ERole } from './roles';

export interface IAuthentication {
  role: ERole;
}

export type TAuthentication<Params> = {
  authentication: IAuthentication;
  params: Params;
};
