import React from 'react';
import { Example, ControlTypes, Document } from '@component-controls/core';
import { SeekColor, SeekColorPalette } from './SeekColor';
import { ColorProps } from '../../types';

export default {
  title: 'Design Tokens/Colors/SeekColor',
  component: SeekColor,
} as Document;

export const overview: Example<ColorProps> = ({ name, color }) => (
  <SeekColor name={name} color={color} />
);

overview.controls = {
  name: '@sk-blue-darker',
  color: { type: ControlTypes.COLOR, value: '#071d40' },
};

export const palette: Example = () => (
  <SeekColorPalette
    palette={{
      '@sk-blue-darker': '#001b38',
      '@sk-blue-dark': '#042763',
      '@sk-blue': '#0d3880',
      '@sk-blue-light': '#184da8',
      '@sk-blue-lighter': '#2765cf',
      '@sk-pink': '#e60278',
      '@sk-green': '#157e00',
    }}
  />
);
