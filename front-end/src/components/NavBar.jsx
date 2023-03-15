import React, { useContext } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import logo from '../assets/beer_logo.svg';

function NavBar() {
  const { user, setUser } = useContext(AppContext);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getInitials = (name) => {
    const full = name.split(' ');
    const initials = full.shift().charAt(0) + full.pop().charAt(0);
    return initials.toUpperCase();
  };

  return (
    <AppBar sx={ { width: '100%' } } color="primary">
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <Box
            component="img"
            sx={ { display: { xs: 'none', md: 'flex' }, mr: 2, width: 50 } }
            alt="logo"
            src={ logo }
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={ {
              mr: 3,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            } }
          >
            Breja!
          </Typography>
          <Box sx={ { flexGrow: 1, display: { xs: 'flex', md: 'none' } } }>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={ handleOpenNavMenu }
              color="inherit"
            >
              {user.role && <MenuIcon />}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={ anchorElNav }
              anchorOrigin={ {
                vertical: 'bottom',
                horizontal: 'left',
              } }
              keepMounted
              transformOrigin={ {
                vertical: 'top',
                horizontal: 'left',
              } }
              open={ Boolean(anchorElNav) }
              onClose={ handleCloseNavMenu }
              sx={ {
                display: { xs: 'block', md: 'none' },
              } }
            >
              { user.role === 'customer' && (
                <MenuItem
                  onClick={ () => {
                    handleCloseNavMenu();
                    navigate('/customer/products');
                  } }
                >
                  <Typography textAlign="center">Produtos</Typography>
                </MenuItem>
              )}
              { user.role === 'customer' && (
                <MenuItem
                  onClick={ () => {
                    handleCloseNavMenu();
                    navigate('/customer/orders');
                  } }
                >
                  <Typography textAlign="center">Meus Pedidos</Typography>
                </MenuItem>
              )}
              { user.role === 'seller' && (
                <MenuItem
                  onClick={ () => {
                    handleCloseNavMenu();
                    navigate('/seller/orders');
                  } }
                >
                  <Typography textAlign="center">Pedidos</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <Box
            component="img"
            sx={ { display: { xs: 'flex', md: 'none' }, mr: 1, width: 50 } }
            alt="logo"
            src={ logo }
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={ {
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            } }
          >
            Breja!
          </Typography>
          <Box sx={ { flexGrow: 1, display: { xs: 'none', md: 'flex' } } }>
            { user.role === 'customer' && (
              <Button
                onClick={ () => {
                  handleCloseNavMenu();
                  navigate('/customer/products');
                } }
                sx={ { my: 2, color: 'white', display: 'block' } }
              >
                Produtos
              </Button>
            )}
            { user.role === 'customer' && (
              <Button
                onClick={ () => {
                  handleCloseNavMenu();
                  navigate('/customer/orders');
                } }
                sx={ { my: 2, color: 'white', display: 'block' } }
              >
                Meus Pedidos
              </Button>
            )}
            { user.role === 'seller' && (
              <Button
                onClick={ () => {
                  handleCloseNavMenu();
                  navigate('/seller/orders');
                } }
                sx={ { my: 2, color: 'white', display: 'block' } }
              >
                Pedidos
              </Button>
            )}
          </Box>
          <Box sx={ { flexGrow: 0 } }>
            <Tooltip title="Abrir configurações">
              {user && (
                <IconButton onClick={ handleOpenUserMenu } sx={ { p: 0 } }>
                  <Avatar alt={ user.name }>{getInitials(user.name)}</Avatar>
                </IconButton>
              )}
            </Tooltip>
            <Menu
              sx={ { mt: '45px' } }
              id="menu-appbar"
              anchorEl={ anchorElUser }
              anchorOrigin={ {
                vertical: 'top',
                horizontal: 'right',
              } }
              keepMounted
              transformOrigin={ {
                vertical: 'top',
                horizontal: 'right',
              } }
              open={ Boolean(anchorElUser) }
              onClose={ handleCloseUserMenu }
            >
              {user && (
                <MenuItem disabled color="black">
                  <Typography>{user.name}</Typography>
                </MenuItem>
              )}
              {user && (
                <Divider />
              )}
              {user && (
                <MenuItem
                  onClick={ () => {
                    handleCloseUserMenu();
                    setUser(undefined);
                    navigate('/login');
                  } }
                >
                  <Typography textAlign="center">Sair</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
