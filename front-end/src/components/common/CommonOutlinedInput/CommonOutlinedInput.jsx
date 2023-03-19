import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import React from 'react';
import { node, string, shape, bool, func } from 'prop-types';

function CommonOutlinedInput({
  iconStart,
  iconEnd,
  placeholder,
  value,
  sx,
  name,
  type,
  error,
  onClick,
  onChange,
  onKeyPress,
}) {
  return (
    <OutlinedInput
      startAdornment={
        !iconStart ? null
          : (
            <InputAdornment position="start">
              {iconStart}
            </InputAdornment>)
      }
      endAdornment={
        !iconEnd ? null
          : (
            <IconButton
              edge="end"
              onClick={ onClick }
            >
              {iconEnd}
            </IconButton>)
      }
      placeholder={ placeholder }
      size="small"
      value={ value }
      sx={ sx }
      name={ name }
      type={ type }
      error={ error }
      onChange={ onChange }
      onKeyPress={ onKeyPress }
    />
  );
}

CommonOutlinedInput.propTypes = {
  iconStart: node,
  iconEnd: node,
  placeholder: string,
  value: string,
  sx: shape(),
  name: string,
  type: string,
  error: bool,
  onClick: func,
  onChange: func,
  onKeyPress: func,
};

CommonOutlinedInput.defaultProps = {
  iconStart: null,
  iconEnd: null,
  placeholder: '',
  value: '',
  sx: {},
  name: '',
  type: '',
  error: false,
  onClick: () => {},
  onChange: () => {},
  onKeyPress: () => {},
};

export default CommonOutlinedInput;
