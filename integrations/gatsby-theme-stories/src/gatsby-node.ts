import fs from 'fs';
import sysPath from 'path';
import { log } from '@component-controls/logger';
import {
  compile,
  watch,
  CompilerCallbackFn,
  searchIndexing,
} from '@component-controls/webpack-compile';
import {
  BuildProps,
  defaultCompileProps,
  getBundleName,
  getCSSBundleName,
  Store,
} from '@component-controls/core';
import { mergeBuildConfiguration } from '@component-controls/config';

import {
  CreatePagesArgs,
  CreateWebpackConfigArgs,
  PluginCallback,
  Page,
} from 'gatsby';
import { loadStore } from '@component-controls/store';
import {
  getIndexPage,
  getHomePages,
  DocHomePagesPath,
  getDocPages,
  DocPagesPath,
  getSiteMap,
} from '@component-controls/routes';

const { StorePlugin } = require('@component-controls/store/plugin');

export const createPagesStatefully = async (
  { actions, store: gatsbyStore }: CreatePagesArgs,
  options: BuildProps,
  doneCb: PluginCallback,
): Promise<void> => {
  const { createPage, deletePage } = actions;
  const config: BuildProps = {
    ...defaultCompileProps,
    ...options,
  };
  const onBundle: CompilerCallbackFn = async ({ store: loadingStore }) => {
    if (loadingStore) {
      const store: Store = loadStore(loadingStore, true);
      const createGatsbyPage: CreatePagesArgs['actions']['createPage'] = props => {
        gatsbyStore.getState().pages.forEach((page: Page) => {
          if (page.path === props.path && page.component === props.component) {
            deletePage({
              path: page.path,
              component: props.component,
            });
          }
        });
        createPage(props);
      };
      //home page
      const { path, docId, type, storyId } = getIndexPage(store) || {};
      createGatsbyPage({
        path,
        component: require.resolve(`../src/templates/DocPage.tsx`),
        context: {
          docId,
          type,
          storyId,
        },
      });
      const homePages = getHomePages(store);
      homePages.forEach(({ path, docId, storyId, type }: DocHomePagesPath) => {
        createGatsbyPage({
          path,
          component: require.resolve(`../src/templates/DocHome.tsx`),
          context: {
            type,
            docId,
            storyId,
          },
        });
      });

      const docPages = getDocPages(store);
      docPages.forEach(
        ({ path, type, docId, storyId, category, activeTab }: DocPagesPath) => {
          createGatsbyPage({
            path,
            component: require.resolve(`../src/templates/DocPage.tsx`),
            context: {
              type,
              docId,
              storyId,
              category,
              activeTab,
            },
          });
        },
      );
      if (process.env.NODE_ENV === 'production') {
        if (store.config.siteMap) {
          const sitemap = getSiteMap(store);
          const staticFolder =
            config.staticFolder ||
            sysPath.join(process.cwd(), 'public', 'static');
          const sitemapfolder = sysPath.resolve(staticFolder as string, '..');
          if (!fs.existsSync(sitemapfolder)) {
            fs.mkdirSync(sitemapfolder, { recursive: true });
          }
          const sitemapname = sysPath.resolve(sitemapfolder, 'sitemap.xml');
          log('creating sitemap', sitemapname);
          fs.writeFileSync(sitemapname, sitemap, 'utf8');
        }
        await searchIndexing(store);
      }
      process.env.GATSBY_CC_CSS_FILENAME = getCSSBundleName(store.config);
    }

    doneCb(null, null);
  };
  const run = process.env.NODE_ENV === 'development' ? watch : compile;
  await run(config, onBundle);
};

export const onCreateWebpackConfig = (
  { actions }: CreateWebpackConfigArgs,
  options: BuildProps,
): void => {
  //inject store bundle name
  actions.setWebpackConfig({
    plugins: [
      new StorePlugin({
        bundleFileName: getBundleName(mergeBuildConfiguration(options)),
      }),
    ],
  });
};
