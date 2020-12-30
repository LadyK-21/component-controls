/** @jsx jsx */
import { FC, useState } from 'react';
import { Box, jsx, Button, ThemeUIStyleObject } from 'theme-ui';
import {
  StoryBlockContainer,
  StoryBlockContainerProps,
} from '@component-controls/blocks';
import { useStory, StoryInputProps } from '@component-controls/store';
import {
  ActionContainer,
  Multiselect,
  MultiselectItem,
} from '@component-controls/components';
import { ViewportBox } from './ViewportBox';

export interface ViewportBlockOwnProps {
  sizes?: Record<string, number>;
  sxContainer?: ThemeUIStyleObject;
}

export type ViewportBlockProps = ViewportBlockOwnProps &
  StoryBlockContainerProps &
  StoryInputProps;
export const ViewportBlock: FC<ViewportBlockProps> = ({
  id,
  name,
  sizes = {
    '320px': 320,
    '375px': 375,
    '768px': 768,
    '1024px': 1024,
  },
  sxContainer,
  ...props
}) => {
  const story = useStory({ id, name });
  const [visible, setVisible] = useState({ ...sizes });
  return story?.id ? (
    <StoryBlockContainer story={story} {...props}>
      <ActionContainer
        actions={[
          {
            node: (
              <Multiselect
                items={Object.keys(visible).map(name => ({
                  label: name,
                  selected: visible[name] !== 0,
                }))}
                onChange={(item: MultiselectItem) => {
                  setVisible({
                    ...visible,
                    [item.label]: visible[item.label] ? 0 : sizes[item.label],
                  });
                }}
              >
                <Button>widths</Button>
              </Multiselect>
            ),
          },
        ]}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            height: '100%',
            width: '100%',
            overflow: 'auto',
            pt: 3,
            pb: 4,
            pl: 1,
            ...sxContainer,
          }}
        >
          {Object.keys(visible)
            .filter(name => visible[name])
            .map(name => (
              <ViewportBox
                key={name}
                storyId={story.id}
                size={visible[name]}
                sizeLabel={name}
              />
            ))}
        </Box>
      </ActionContainer>
    </StoryBlockContainer>
  ) : null;
};
