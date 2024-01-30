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
} from '@mui/material';
import React from 'react';

const settings = ['User settings', 'Logout'];

const Header = () => {
  const loggedIn = false;
  // const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
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
                  <MenuItem key={setting}>
                    <Typography textAlign={'center'}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            'Login'
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
