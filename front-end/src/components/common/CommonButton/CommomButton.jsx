import { Button } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

function CommomButton({ children, disabled, size, onClick, variant, type }) {
  return (
    <Button
      disabled={ disabled }
      size={ size }
      onClick={ onClick }
      variant={ variant }
      type={ type }
    >
      {children}
    </Button>
  );
}

CommomButton.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool.isRequired,
  size: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.string,
  type: PropTypes.string,
};

CommomButton.defaultProps = {
  variant: 'contained',
  type: 'button',
  size: 'medium',
};

export default CommomButton;
