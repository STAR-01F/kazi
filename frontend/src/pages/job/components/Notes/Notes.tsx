import {useState, useEffect} from 'react';
import {TextField, Button, Grid} from '@mui/material';
import {UpdateUserJobNotes} from '@services/firebase/userJobs';
import {useFeedback} from '@hooks/useFeeback';
import {useAuth} from '@services/firebase/hooks/useAuth';
import {UserJob} from 'src/@types';

type NotesProps = {
  userJob?: UserJob;
};

const Notes = ({userJob}: NotesProps) => {
  const {setFeedback} = useFeedback();
  const {user} = useAuth();
  const [notesData, setNotesData] = useState('');

  useEffect(() => {
    if (!userJob) {
      return;
    }
    setNotesData(userJob.notes?.content || '');
  }, [userJob]);

  const handleUpdateJobNotes = async (notes: string) => {
    if (!user?.uid || !userJob) return;
    const resp = await UpdateUserJobNotes(user.uid, userJob.id, notes);
    if (resp.status === 'Success') {
      setFeedback({
        type: 'success',
        message: resp.message,
      });
      return;
    }

    setFeedback({
      type: 'error',
      message: resp.message,
    });
  };

  return (
    <Grid container>
      <TextField
        id="outlined-multiline-static"
        variant="standard"
        multiline
        fullWidth={true}
        value={notesData}
        onChange={(e) => setNotesData(e.target.value)}
        onBlur={() => {
          handleUpdateJobNotes(notesData);
        }}
        placeholder="Type here"
      />
      <Grid
        container
        item
        alignSelf={'flex-end'}
        justifyContent={'flex-end'}
        width={'100%'}
      >
        <Button
          onClick={() => handleUpdateJobNotes(notesData)}
          variant="contained"
          sx={{mt: '1rem'}}
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
};

export default Notes;
