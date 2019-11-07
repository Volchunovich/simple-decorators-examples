import { METADATA_KEY } from '../constants';

const inject = <T extends Function>(identifier: T) => (
  target: Object,
  propertyKey: string | symbol
) => {
  const isInjectable = Reflect.getMetadata(METADATA_KEY.INJECTABLE, identifier);

  if (!isInjectable) {
    throw new Error(`Identifier [${identifier.name}] not marked as injectable.`);
  }

  const args: Function[] = (Reflect.getMetadata(METADATA_KEY.PARAM_TYPES, identifier) || [])
    .map((argument: Function) => argument());

  Object.defineProperty(target, propertyKey, {
    enumerable: true,
    get: () => Reflect.construct(identifier, args)
  });
};

export { inject };
