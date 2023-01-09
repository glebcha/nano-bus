import path from 'path';

export function getOutputOptions({ moduleType, version, names, paths }) {
  const isESM = moduleType === 'es';
  const footer = `
  if (globalThis.NanoEventBus ) {
    globalThis.NanoEventBus.version = '${version}';
  } else {
    globalThis.NanoEventBus = {version: '${version}'};
  }

  Object.defineProperty(globalThis, 'NanoEventBus',  {
    writable: false,
    configurable: false
  });
  Object.defineProperty(globalThis.NanoEventBus, 'EventBus',  {
    writable: false,
    configurable: false
  });
  `;

  const output = Object.assign(
    {
      format: moduleType,
      sourcemap: !isESM,
    },
    isESM ?
    {
      preserveModules: true,
      dir: path.join(paths.output, moduleType),
    } :
    {
      name: names.global,
      extend: true,
      footer,
      file: path.join(paths.output, moduleType, `${names.lib}.${moduleType}.js`),
    }
  );

  return output;
}
