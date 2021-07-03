import React, { FC } from 'react';
import { OptionsType } from '../../contexts/OptionsContext';
import { OptionsData } from '../../contexts/options';
import { MemoOption } from './MemoOption';
import { CheckboxOption } from './CheckboxOption';
import { SelectOption } from './SelectOption';

export const ConfigOption: FC<{
  paramName: OptionsType;
  title: string;
} & OptionsData> = props => {
  const { value: propValue, options, defaultValue, type } = props;
  const value = typeof propValue === 'undefined' ? defaultValue : propValue;
  if (Array.isArray(value) || type === 'textarea') {
    return <MemoOption {...props} />;
  } else if (Array.isArray(options) || type === 'select') {
    return <SelectOption {...props} />;
  }
  return <CheckboxOption {...props} />;
};