import React from 'react';
import { Document, Example, ControlTypes } from '@component-controls/core';
import { Tag, TagProps } from './Tag';

export default {
  title: 'Components/Tag',
  component: Tag,
} as Document;

export const overview: Example<TagProps> = ({ color }) => {
  return <Tag color={color}>some text</Tag>;
};

overview.controls = {
  color: { type: ControlTypes.COLOR, value: 'red' },
};
