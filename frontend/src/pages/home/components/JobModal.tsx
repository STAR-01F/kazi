import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddJob from './AddJob';

export default function JobModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <AddJob handleClickOpen={handleClickOpen}/>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData).entries());
            console.log(formJson)
            handleClose();
          },
        }}
      >
        <DialogTitle>Add Job</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the details for the new job.
          </DialogContentText>
          <TextField
            autoFocus
            required
            sx={{marginBottom: 2}}
            id="name"
            name="job"
            label="Job Title"
            fullWidth
             variant="standard"
                  />
          <TextField
            id="outlined-textarea"
            label="Job Description"
            placeholder=""
            multiline
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}