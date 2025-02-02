import path from 'path';
import fs from 'fs';
import { BuildProps } from '@component-controls/core';
import {
  getCSSFilePath,
  getDistFolder,
} from '@component-controls/core/node-utils';
import { buildBundle } from '@component-controls/base-integration/webpack-build';
// const SegfaultHandler = require('segfault-handler');
// SegfaultHandler.registerHandler('crash.log');

module.exports =
  ({
    bundleName,
    configPath,
    presets,
    staticFolder,
    distFolder: userDistFolder,
    webpack,
    loaders,
    ...rest
  }: BuildProps) =>
  () => {
    const distFolder = getDistFolder({ distFolder: userDistFolder });
    const buildOptions: BuildProps = {
      bundleName,
      configPath,
      presets,
      distFolder: path.resolve(__dirname),
      staticFolder: staticFolder || path.join(distFolder, 'static'),
      loaders: {
        ...loaders,
        'mini-css-extract-plugin': {
          module: require.resolve('next/dist/compiled/mini-css-extract-plugin'),
        },
      },
      webpack,
    };
    return {
      /**
       * we need some async function, to make sure the compilation process is completed
       * headers is the first called from async redirects() amd async rewrites()
       */
      async headers() {
        await buildBundle({
          options: buildOptions,
          onEndBuild: ({ store }) => {
            const cssBundle = getCSSFilePath(store.config);
            if (fs.existsSync(cssBundle)) {
              const styles = fs.readFileSync(cssBundle, 'utf8');
              process.env.NEXT_PUBLIC_CC_CSS = JSON.stringify(styles);
            }
          },
        });
        return [];
      },

      ...rest,
    };
  };
