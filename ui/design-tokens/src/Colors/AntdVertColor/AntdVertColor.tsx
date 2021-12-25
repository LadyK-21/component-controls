/** @jsx jsx */
import { FC, useState, useMemo } from 'react';
import { jsx } from 'theme-ui';
import { CopyContainer } from '@component-controls/components';
import { colorToStr, mostReadable } from '../utils';
import { ColorBlockProps } from '../../types';
import { FlexContainerProps, FlexContainer } from '../../containers';

/**
 * Color item displaying the color as a small block, expanding on hover.
 * Design inspired by [Antd](https://ant.design/docs/spec/colors).
 */

export const AntdVertColor: FC<ColorBlockProps> = ({ name, color, hover }) => {
  const [hoverMe, setHoverMe] = useState(false);
  const colorValue = typeof color === 'string' ? color : color.value;
  const { hex, rgba } = colorToStr(colorValue);
  const textColor = mostReadable(hex);
  const isContained = typeof hover !== 'undefined';
  const onMouseEvents = useMemo(
    () =>
      isContained
        ? {}
        : {
            onMouseOver: () => setHoverMe(true),
            onMouseOut: () => setHoverMe(false),
          },
    [isContained],
  );

  return (
    <div sx={{ display: 'flex', flex: '1' }}>
      <CopyContainer value={hex} name={name} sx={{ width: '100%' }}>
        <div
          {...onMouseEvents}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            bg: colorValue,
            color: textColor,
            height: 44,
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 0,
            transition: 'all .2s',
            px: 3,
            ':hover': {
              mr: -3,
            },
          }}
        >
          <div
            sx={{
              fontWeight: 'bold',
              mr: 4,
            }}
          >
            {name || hex}
          </div>
          <div
            sx={{
              pointerEvents: 'none',
              ...(hover || hoverMe ? {} : { visibility: 'hidden', width: 0 }),
            }}
          >
            {!name
              ? `${rgba.r}, ${rgba.g}, ${rgba.b}${
                  rgba.a !== 1 ? `, ${rgba.a}` : ''
                }`
              : hex}
          </div>
        </div>
      </CopyContainer>
    </div>
  );
};

/**
 *
 * palette displayed with AntdVertColor items
 * using a css flex display direction column
 */
export const AntdVertColorPalette: FC<
  Omit<FlexContainerProps, 'children' | 'direction'>
> = props => (
  <FlexContainer direction="column" sx={{ width: 250 }} {...props}>
    {({ name, value, hover }) => (
      <AntdVertColor
        key={`color_item_${name}}`}
        name={name}
        color={value}
        hover={hover}
      />
    )}
  </FlexContainer>
);
