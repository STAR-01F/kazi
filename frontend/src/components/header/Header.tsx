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
  useTheme,
  Grid,
} from '@mui/material';
import {logout} from '@services/firebase/auth';
import {useAuth} from '@services/firebase/hooks/useAuth';
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import logo from '../../assets/Kazi.svg';
import SendFeedback from './SendFeedback';

type Settings = {
  name: string;
  func: () => void;
};
const Header = () => {
  const {user} = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
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
    // {
    //   name: 'Dashboard',
    //   func: () => {
    //     navigate('/');
    //   },
    // },
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
    <AppBar
      position="static"
      sx={{
        padding: '0px',
        borderRadius: '0px',
        border: 'none',
        borderBottom: '1px solid ' + theme.palette.grey[300],
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              width: '80px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
            }}
            component={Link}
            to="/"
          >
            <img src={logo} alt="Kazi Logo" />
          </Box>
          <Grid
            container
            gap={'15px'}
            // direction={'column'}
            justifyContent={'flex-end'}
          >
            <SendFeedback />
            {/* <Typography
            variant="h6"
            noWrap
            sx={{fontWeight: 700, display: {xs: 'flex'}}}
          >
            Kazi
          </Typography> */}
            {user ? (
              <Box sx={{flexGrow: 0}}>
                <Tooltip title="Settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                    <Avatar
                      alt={user.displayName || ''}
                      src={user.photoURL ? user.photoURL : '.'}
                    />
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
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
