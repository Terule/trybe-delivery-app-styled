import React from 'react';
import TextField from '@mui/material/TextField';
import { string, func, bool, shape } from 'prop-types';

function CommonTextfield({
  variant,
  label,
  value,
  onChange,
  error,
  helperText,
  size,
  sx,
  type,
  name,
}) {
  return (
    <TextField
      variant={ variant }
      label={ label }
      value={ value }
      onChange={ onChange }
      error={ error }
      helperText={ helperText }
      size={ size }
      sx={ sx }
      type={ type }
      name={ name }
    />
  );
}

CommonTextfield.propTypes = {
  variant: string,
  label: string,
  value: string,
  onChange: func,
  error: bool,
  helperText: string,
  size: string,
  sx: shape(),
  type: string,
  name: string,
};

CommonTextfield.defaultProps = {
  variant: 'outlined',
  value: '',
  label: '',
  onChange: () => {},
  helperText: '',
  error: false,
  size: 'small',
  sx: {},
  type: 'text',
  name: '',
};

export default CommonTextfield;
