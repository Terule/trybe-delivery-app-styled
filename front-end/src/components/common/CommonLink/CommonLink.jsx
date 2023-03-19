import React from 'react';
import { Link } from '@mui/material';
import { node, string } from 'prop-types';

function CommonLink({ children, href }) {
  return (
    <Link href={ href }>
      { children }
    </Link>
  );
}

CommonLink.propTypes = {
  children: node.isRequired,
  href: string.isRequired,
};

export default CommonLink;
