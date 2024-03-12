import {useState, useEffect} from 'react';
import {Grid, TextField, Button} from '@mui/material';
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
    <Grid container item justifyContent={'center'}>
      <TextField
        id="outlined-multiline-static"
        label="notes"
        multiline
        rows={5}
        fullWidth={true}
        value={notesData}
        onChange={(e) => setNotesData(e.target.value)}
      />
      <Button
        onClick={() => handleUpdateJobNotes(notesData)}
        variant="contained"
      >
        Save
      </Button>
    </Grid>
  );
};

export default Notes;
