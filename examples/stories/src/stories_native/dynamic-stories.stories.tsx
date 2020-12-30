/* eslint-disable react/display-name */
/** @jsx jsx */
import { jsx, Button } from 'theme-ui';
import { DynamicExamples } from '@component-controls/core';
import { theme } from '@component-controls/components';

export default {
  title: 'ESM/Dynamic stories',
  author: 'atanasster',
  order: 11,
  description:
    "You can create 'dynamic' stories - below are created separate stories for each theme color.",
};

export const buttonColors = (): DynamicExamples => {
  return Object.keys(theme.colors)
    .filter(color => typeof theme.colors[color] === 'string')
    .map(color => {
      return {
        name: color,
        description: `theme.colors.${color}: **${theme.colors[color]}**`,
        source: `<Button sx={{ bg: '${color}'}}>Color ${theme.colors[color]}</Button>`,
        renderFn: () => (
          <Button sx={{ bg: color }}>{`Color ${theme.colors[color]}`}</Button>
        ),
      };
    });
};

buttonColors.dynamic = true;
