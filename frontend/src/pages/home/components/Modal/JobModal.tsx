import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import AddJob from '../Banner/AddJob';
import LinkJobModal from './LinkJobModal';
import ManualJobModal from './ManualJobModal';

export default function JobModal() {
  const [open, setOpen] = React.useState(false);
  const [openManualJobModal, setManualJobModalOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const toggle = () => {
    setManualJobModalOpen((prev) => !prev);
  };

  return (
    <React.Fragment>
      <AddJob handleClickOpen={handleClickOpen} />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>Add Job</DialogTitle>
        {openManualJobModal ? (
          <ManualJobModal toggle={toggle} onClose={handleClose} />
        ) : (
          <LinkJobModal toggle={toggle} onClose={handleClose} />
        )}
      </Dialog>
    </React.Fragment>
  );
}
