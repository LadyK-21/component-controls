import React, { FC, Fragment } from 'react';
import {
  Playground,
  PropsTable,
  Story,
  Description,
} from '@component-controls/blocks';
import { getControlsCount, TabConfiguration } from '@component-controls/core';
import { useCurrentStory } from '@component-controls/store';
import { AllyBlock } from '@component-controls/axe-plugin';
import { ViewportBlock } from '@component-controls/viewport-plugin';

const TestingPage: FC = () => {
  const story = useCurrentStory();
  const controlsCount = getControlsCount(story?.controls);
  return (
    <Fragment>
      <Description />
      {controlsCount > 0 && (
        <>
          <Playground title=".">
            <Story id="." />
          </Playground>

          <PropsTable of="." title="Controls" visibility="controls" />
        </>
      )}
      <AllyBlock title="A11y tests" />
      <ViewportBlock title="Viewport" />
    </Fragment>
  );
};

export default {
  title: 'Testing',
  component: TestingPage,
} as TabConfiguration;