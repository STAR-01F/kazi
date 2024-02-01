import {Avatar, Box, Button, Container, Typography} from '@mui/material';
import {capitalizeFirstLetter} from '@utils/helper';
import {useState} from 'react';
import DeleteModal from './components/DeleteModal';

const Profile = () => {
  const user = {
    firstname: 'firstname',
    lastname: 'lastname',
    email: 'email@email.com',
  };
  const [open, setOpen] = useState(false);
  return (
    <Container component="main" maxWidth="xs">
      <DeleteModal
        open={open}
        onClose={() => setOpen(false)}
        onDelete={() => setOpen(false)}
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
        <Avatar sx={{m: 1}}>
          {capitalizeFirstLetter(user.firstname[0]) +
            capitalizeFirstLetter(user.lastname[0])}
        </Avatar>
        <Typography component="h1" variant="h5">
          {capitalizeFirstLetter(user.firstname) +
            ' ' +
            capitalizeFirstLetter(user.lastname)}
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
