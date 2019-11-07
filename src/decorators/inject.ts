import { METADATA_KEY } from '../constants';

const injectable = () => <T extends Function>(target: T) => {
  const types = Reflect.getMetadata(METADATA_KEY.PARAM_TYPES, target) || [];
  Reflect.defineMetadata(METADATA_KEY.INJECTABLE, types, target);
  return target;
};

export { injectable };
