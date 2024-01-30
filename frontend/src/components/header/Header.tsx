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

const settings = ['User Settings', 'Logout'];

const Header = () => {
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
        <Toolbar disableGutters style={{border: '1px solid red'}}>
          {/* actual logo can go here */}
          <Typography
            variant="h6"
            noWrap
            sx={{fontWeight: 700, display: {xs: 'none', md: 'flex'}}}
          >
            TrackAI
          </Typography>
          <Box sx={{flexGrow: 0}} border={'1px solid red'}>
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
