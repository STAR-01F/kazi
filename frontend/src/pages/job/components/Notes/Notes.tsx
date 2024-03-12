import {useState, useEffect} from 'react';
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
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
    <Grid justifyContent={'center'} flexDirection={'column'} container item>
      <Card sx={{width: '100%'}}>
        <CardHeader
          style={{
            borderRadius: '5px 5px 0 0',
            background: '#D5D5D5',
            color: 'black',
          }}
          title="Notes"
          titleTypographyProps={{fontSize: '1.2rem', fontWeight: 'bold'}}
          sx={{height: '2.5rem'}}
        />
        <CardContent sx={{width: '100%'}}>
          <TextField
            id="outlined-multiline-static"
            variant="standard"
            multiline
            rows={15}
            fullWidth={true}
            value={notesData}
            onChange={(e) => setNotesData(e.target.value)}
            onBlur={() => {
              handleUpdateJobNotes(notesData);
            }}
          />
        </CardContent>
      </Card>

      <Button
        onClick={() => handleUpdateJobNotes(notesData)}
        variant="contained"
        sx={{mt: '1rem', alignSelf: 'end'}}
      >
        Save
      </Button>
    </Grid>
  );
};

export default Notes;
