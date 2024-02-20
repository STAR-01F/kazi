import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import AddJob from '../Banner/AddJob';
import LinkJobModal from './LinkJobModal';
import ManualJobModal from './ManualJobModal';
import {useSearchParams} from 'react-router-dom';

export default function JobModal() {
  const [openModal, setOpen] = useSearchParams();
  const open = openModal.get('jobModal') === 'open';

  const [openManualJobModal, setManualJobModalOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen({jobModal: 'open'});
  };
  const handleClose = () => {
    setOpen();
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
