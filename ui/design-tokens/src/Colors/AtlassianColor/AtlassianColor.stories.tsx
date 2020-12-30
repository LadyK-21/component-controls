import React from 'react';
import { Example, ControlTypes, Document } from '@component-controls/core';
import { AtlassianColor, AtlassianColorPalette } from './AtlassianColor';
import { ColorProps } from '../../types';

export default {
  title: 'Design Tokens/Colors/AtlassianColor',
  component: AtlassianColor,
} as Document;

export const overview: Example<ColorProps> = ({ name, color }) => (
  <AtlassianColor name={name} color={color} />
);

overview.controls = {
  color: {
    type: ControlTypes.OBJECT,
    value: {
      value: { type: ControlTypes.COLOR, value: '#2270ee' },
      name: 'Blue400',
    },
  },
};

export const name: Example = () => (
  <AtlassianColor name="Critical" color={{ name: 'brand', value: '#f94d32' }} />
);

export const rgb: Example = () => (
  <AtlassianColor name="text" color="rgb(0, 0, 0)" />
);

export const rgba: Example = () => (
  <AtlassianColor name="shadow" color="rgba(0, 0, 0, 0.1)" />
);

export const hsl: Example = () => (
  <AtlassianColor name="accent" color="hsl(12, 10%, 50%)" />
);

export const hsla: Example = () => (
  <AtlassianColor name="accent" color="hsl(12, 10%, 50%, .3)" />
);

export const palette: Example = () => (
  <AtlassianColorPalette
    palette={{
      'Poppy surprise': { value: '#FF5630', name: 'R300' },
      'Golden state': { value: '#FFAB00', name: 'Y300' },
      'Fine pine': { value: '#36B37E', name: 'G300' },
      Tamarama: { value: '#00B8D9', name: 'T300' },
      "Da' juice": { value: '#6554C0', name: 'P300' },
      Critical: { value: '#f94d32', name: 'Red400' },
    }}
  />
);
