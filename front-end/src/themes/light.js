import { createTheme } from '@mui/material';

const light = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ffb800',
    },
    background: {
      default: '#f5f5f5',
      paper: '#fff',
    },
  },
});

export default light;
