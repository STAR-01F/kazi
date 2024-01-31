import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import React, {useState} from 'react';

const settings = ['User settings', 'Log out'];

const Header = () => {
  // This useState will eventually be the context passed in of the user ID existing or not.
  const [loggedIn, setLoggedIn] = useState(false);

  // currently these handle click functions are just changing state to display what happens
  // when user clicks log in or log out.
  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleMenuItemClick = (setting: string) => {
    if (setting === 'Log out') {
      setLoggedIn(false);
      setAnchorElUser(null);
    }
  };

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {/* actual logo can go here */}
          <Typography
            variant="h6"
            noWrap
            sx={{fontWeight: 700, display: {xs: 'flex'}}}
          >
            TrackAI
          </Typography>
          {loggedIn ? (
            <Box sx={{flexGrow: 0}}>
              <Tooltip title="Settings">
                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                  <Avatar alt="UserName" src="" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{mt: '45px'}}
                open={Boolean(anchorElUser)}
                anchorEl={anchorElUser}
                onClose={handleCloseUserMenu}
                keepMounted
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
              >
                {settings.map((setting) => (
                  <MenuItem
                    onClick={() => handleMenuItemClick(setting)}
                    key={setting}
                  >
                    <Typography textAlign={'center'}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Button
              onClick={handleLogin}
              sx={{color: 'white'}}
              href="#login page"
            >
              Log in
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
