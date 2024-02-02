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
import {logout} from '@services/firebase/firebase';
import {useAuth} from '@services/firebase/hooks/useAuth';
import React from 'react';
import {useNavigate} from 'react-router-dom';

type Settings = {
  name: string;
  func: () => void;
};
const Header = () => {
  const {user} = useAuth();
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/signin');
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
  const settings: Settings[] = [
    {
      name: 'Dashboard',
      func: () => {
        navigate('/');
      },
    },
    {
      name: 'Profile',
      func: () => {
        navigate('/profile');
      },
    },
    {
      name: 'Log out',
      func: async () => {
        setAnchorElUser(null);
        await logout();
      },
    },
  ];
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
          {user ? (
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
                {settings.map(({name, func}, i) => (
                  <MenuItem onClick={func} key={i}>
                    <Typography textAlign={'center'}>{name}</Typography>
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
