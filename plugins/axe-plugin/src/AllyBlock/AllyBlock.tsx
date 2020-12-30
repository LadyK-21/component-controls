/* eslint-disable react/display-name */
import React, { FC, useRef, useContext, useState, useEffect } from 'react';
import {
  run as runAxe,
  configure as configureAxe,
  reset,
  cleanup,
} from 'axe-core';

import { useStory, StoryInputProps } from '@component-controls/store';
import { resetTabCounter } from '@component-controls/components';

import {
  StoryBlockContainer,
  StoryBlockContainerProps,
  Story,
} from '@component-controls/blocks';
import { Spec } from 'axe-core';

import { BaseAllyBlock } from './BaseAllyBlock';
import {
  AxeContextProvider,
  AxeSetContext,
  SelectionContextProvider,
} from '../state/context';

interface AllyBlockOwmProps {
  axeOptions?: Spec;
}

export type AllyBlockProps = AllyBlockOwmProps &
  StoryInputProps &
  StoryBlockContainerProps;

const RenderStory: FC<AllyBlockOwmProps & { storyId?: string }> = ({
  axeOptions,
  storyId,
}) => {
  const storyRef = useRef<HTMLDivElement>(null);
  const { setResults } = useContext(AxeSetContext);
  const [mounted, setMounted] = useState(true);
  const isRunning = useRef(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  const collectResults = () => {
    const canvas = storyRef.current?.firstChild;
    if (canvas && isRunning.current === false) {
      isRunning.current = true;
      reset();
      configureAxe(axeOptions || {});
      resetTabCounter();
      runAxe(canvas)
        .then(results => {
          if (mounted) {
            const { passes, violations, incomplete } = results;
            setResults({ passes, violations, incomplete });
            setTimeout(() => (isRunning.current = false), 1000);
          }
        })
        .catch(e => {
          console.error('error running axe-core', e);
          isRunning.current = false;
        });
    }
  };
  const onRender = () => {
    try {
      collectResults();
    } catch (e) {}
  };
  return (
    <Story key={storyId} id={storyId} ref={storyRef} onRender={onRender} />
  );
};

/**
 * Story block container that displays displays the [axe](https://github.com/dequelabs/axe-core) ally test results
 */
export const AllyBlock: FC<AllyBlockProps> = ({
  axeOptions,
  id,
  name,
  ...props
}) => {
  const story = useStory({ id, name });
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);
  return story ? (
    <StoryBlockContainer story={story} {...props}>
      <AxeContextProvider>
        <SelectionContextProvider>
          <BaseAllyBlock options={axeOptions}>
            <RenderStory storyId={story.id} axeOptions={axeOptions} />
          </BaseAllyBlock>
        </SelectionContextProvider>
      </AxeContextProvider>
    </StoryBlockContainer>
  ) : null;
};
