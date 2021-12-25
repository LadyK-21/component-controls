/** @jsx jsx */
import { FC } from 'react';
import { jsx, Theme } from 'theme-ui';
import { CopyContainer } from '@component-controls/components';
import { colorToStr, mostReadable } from '../utils';
import { ColorBlockProps, ColorValue } from '../../types';
import { FlexContainerProps, FlexContainer } from '../../containers';

/**
 * Color item displaying as a row, with color, name, sass variable name and hex value
 * Design inspired by [Canvas Design System](https://canvas.hubspot.com/styles/colors).
 */

export const CanvasColor: FC<ColorBlockProps> = ({ name, color }) => {
  const colorObj: ColorValue =
    typeof color === 'string' ? { value: color } : color;
  const { value: colorValue, name: colorName, sass } = colorObj;

  const { hex } = colorToStr(colorValue);
  const textColor = mostReadable(hex);
  return (
    <div sx={{ display: 'flex', flex: '1', mb: 2 }}>
      <div
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          height: 90,
          fontSize: 2,
          border: (t: Theme) => `1px solid ${t.colors?.shadow}`,
          bg: 'background',
        }}
      >
        <CopyContainer
          value={hex}
          name={name}
          sx={{ width: '40%', height: '100%' }}
        >
          <div
            sx={{
              width: '100%',
              height: '100%',
              bg: colorValue,
              color: textColor,
              p: 3,
              fontSize: 1,
            }}
          >
            {name}
          </div>
        </CopyContainer>
        <div
          sx={{
            flex: 1,
          }}
        >
          <div
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div
              sx={{
                fontSize: 1,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              {colorName}
              <div sx={{ bg: 'gray', p: 1 }}>{hex}</div>
            </div>
            <div sx={{ fontSize: 0 }}>{sass}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 *
 * palette displayed with CanvasColor items
 * using a css flex display direction column
 */
export const CanvasColorPalette: FC<
  Omit<FlexContainerProps, 'children' | 'direction'>
> = props => (
  <FlexContainer direction="column" {...props}>
    {({ name, value }) => (
      <CanvasColor key={`color_item_${name}}`} name={name} color={value} />
    )}
  </FlexContainer>
);
