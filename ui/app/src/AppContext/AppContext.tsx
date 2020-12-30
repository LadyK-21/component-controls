/** @jsx jsx */
import { FC, ReactNode } from 'react';
import { jsx } from 'theme-ui';
import queryString from 'query-string';
import { Store, docStoryToId } from '@component-controls/core';
import {
  SidebarContextProvider,
  LinkContextProvider,
  LinkContextProviderProps,
} from '@component-controls/components';
import { BlockContextProvider } from '@component-controls/blocks';
import { App } from '../App';
import { mdxComponents } from './mdxComponents';

export interface AppContextProps {
  docId?: string;
  storyId?: string;
  store: Store;
  linkClass: LinkContextProviderProps['linkClass'];
  Helmet?: FC<{ children: ReactNode }>;
  activeTab?: string;
}

export const AppContext: FC<AppContextProps> = ({
  docId,
  storyId,
  children,
  store,
  linkClass,
  activeTab,
  Helmet,
}) => {
  const query =
    typeof window !== 'undefined'
      ? queryString.parse(window.location.search)
      : undefined;
  let dynStoryId: string | undefined;
  if (query && docId && storyId && !store.stories[storyId]) {
    if (typeof query.story === 'string') {
      dynStoryId = docStoryToId(docId, query.story);
    } else {
      //if dynamic stories - the storyId could be wrong
      if (store.docs[docId] && store.docs[docId].stories) {
        const stories = store.docs[docId].stories as string[];
        if (stories.length) {
          dynStoryId = stories[0];
        }
      }
    }
  } else {
    dynStoryId = storyId;
  }
  return (
    <BlockContextProvider
      storyId={dynStoryId}
      docId={docId}
      store={store}
      activeTab={activeTab}
      components={mdxComponents}
    >
      <SidebarContextProvider>
        <LinkContextProvider linkClass={linkClass}>
          <App Helmet={Helmet}>{children}</App>
        </LinkContextProvider>
      </SidebarContextProvider>
    </BlockContextProvider>
  );
};
