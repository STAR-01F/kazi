import {Avatar, Box, Button, Container, Typography} from '@mui/material';
import {useState} from 'react';
import DeleteModal from './components/DeleteModal';
import {useAuth} from '@services/firebase/hooks/useAuth';
import {DeleteUserProfileByUserId} from '@services/firebase/userProfiles/Delete';
import {useFeedback} from '@hooks/useFeeback';

const Profile = () => {
  const {user} = useAuth();
  const {setFeedback} = useFeedback();
  const [open, setOpen] = useState(false);
  if (!user) {
    return <div>loading...</div>;
  }

  const handleDeleteAccount = async () => {
    if (!user.uid) return;

    const resp = await DeleteUserProfileByUserId(user);
    if (resp.status === 'Error') {
      setFeedback({
        type: 'error',
        message: resp.message,
      });
      return;
    }
    setFeedback({
      type: 'success',
      message: 'Account deleted successfully',
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <DeleteModal
        open={open}
        onClose={() => setOpen(false)}
        onDelete={handleDeleteAccount}
      />
      <Box
        gap={2}
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar
          alt={user.displayName || ''}
          src={user.photoURL ? user.photoURL : '.'}
          sx={{m: 1}}
        />
        <Typography component="h1" variant="h5">
          {user.displayName}
        </Typography>
        <Typography component="h1" variant="h5">
          {user.email}
        </Typography>
        <Button onClick={() => setOpen(true)} variant="contained">
          Delete account
        </Button>
      </Box>
    </Container>
  );
};

export default Profile;
