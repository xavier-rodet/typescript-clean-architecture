import { EAppEvent } from './events';

export type TEventCallback<DTO> = (dto: DTO) => void;

export interface IEventDispatcher {
  emit<DTO>(event: EAppEvent, dto: DTO): void;
  addListener<DTO>(event: EAppEvent, callback: TEventCallback<DTO>): symbol;
  removeListener(listenerId: symbol): void;
}
