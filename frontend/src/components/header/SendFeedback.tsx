import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from '@mui/material';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import {useState} from 'react';
import {useFeedback} from '@hooks/useFeeback';
import {useAuth} from '@services/firebase/hooks/useAuth';
import sendEmail from '@services/emailjs/emailjs';

const SendFeedback = () => {
  const [open, setOpen] = useState(false);
  const [like, setLike] = useState('');
  const [improvement, setImprovement] = useState('');
  const [comments, setComments] = useState('');
  const {setFeedback} = useFeedback();
  const {user} = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendFeedback = async () => {
    // Send feedback to email

    sendEmail({
      like,
      improvement,
      comments,
      user: user?.displayName || 'Anonymous',
      time: new Date().toISOString(),
    });

    setFeedback({
      type: 'success',
      message: 'Thanks for your feedback!',
    });

    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant="outlined"
        startIcon={<InsertCommentIcon />}
      >
        Send Feedback
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText mb={1}>
            Please take a moment to share your experience with Kazi:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="like"
            label="What did you like about Kazi?"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            onChange={(e) => {
              setLike(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="improvement"
            label="Which areas do you think need improvement?"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            onChange={(e) => {
              setImprovement(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="comments"
            label="Do you have any additional comments or suggestions?"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            onChange={(e) => {
              setComments(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSendFeedback} type="submit" color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SendFeedback;
