import { EntityFactory } from '@entities/_common/entity';
import { sanitizer, uid } from './libraries';

export const entityFactory = new EntityFactory(uid, sanitizer);
