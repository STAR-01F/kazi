import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddJob from './AddJob';
import CreateJob from '@utils/savejob';
import type { Job } from 'src/@types';

export default function JobModal() {
    const [open, setOpen] = React.useState(false);
    const [job, setJob] = React.useState<Partial<Job>>();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddJob = () => {
        if (!job) return;
        CreateJob(job);
    };

    return (
        <React.Fragment>
            <AddJob handleClickOpen={handleClickOpen} />
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        console.log(formJson);
                        handleClose();
                    },
                }}>
                <DialogTitle>Add Job</DialogTitle>
                <DialogContent>
                    <DialogContentText mb={1}>
                        Please enter the details for the new job.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        sx={{ marginBottom: 2 }}
                        id='company-name'
                        name='company'
                        label='Company Name'
                        placeholder=''
                        value={job?.Company}
                        onChange={(e) =>
                            setJob(() => ({ Company: e.target.value }))
                        }
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        required
                        sx={{ marginBottom: 2 }}
                        id='job-title'
                        name='job'
                        label='Job Title'
                        placeholder=''
                        value={job?.Title}
                        onChange={(e) =>
                            setJob((j) => ({ ...j, Title: e.target.value }))
                        }
                        fullWidth
                    />
                    <TextField
                        id='job-description'
                        label='Job Description'
                        name='description'
                        placeholder=''
                        value={job?.Description}
                        onChange={(e) =>
                            setJob({ ...job, Description: e.target.value })
                        }
                        multiline
                        fullWidth
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type='submit' onClick={handleAddJob}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
