import {Avatar, Box, Button, Container, Typography} from '@mui/material';
import {useState} from 'react';
import DeleteModal from './components/DeleteModal';
import {useAuth} from '@services/firebase/hooks/useAuth';
import {GetAllDocs} from './getUsersDocs';
import {DeleteJob} from '@services/firebase/jobs';
import { deleteUser } from 'firebase/auth';

const Profile = () => {
  const {user} = useAuth();
  const [open, setOpen] = useState(false);
  if (!user) {
    return <div>loading...</div>;
  }

  const handleDeleteAccount = async () => {
    if (user) {
      const uid = user.uid;
      const jobs = await GetAllDocs(uid);

      if (jobs.status === 'Success') {
        for (let i = 0; i < jobs.data.length; i++) {
          const resp = await DeleteJob(user.uid, jobs.data[i]);
          console.log('resp', resp);
        }
      }
      
      deleteUser(user)
        .then(() => {
          setOpen(false);
          console.log('Account deleted');
        })
        .catch((error: any) => {
          setOpen(false);
          console.error('Account deletion err', error);
        });
    }
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
