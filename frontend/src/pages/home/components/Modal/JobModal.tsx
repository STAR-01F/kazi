import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import AddJob from '../Banner/AddJob';
import LinkJobModal from './LinkJobModal';
import ManualJobModal from './ManualJobModal';
import {useSearchParams} from 'react-router-dom';
import SkeletonJob from '@components/skeleton/job';

export default function JobModal() {
  const [openModal, setOpen] = useSearchParams();
  const open = openModal.get('jobModal') === 'open';
  const [submitting, setSubmitting] = React.useState(false);

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
      {submitting && <SkeletonJob />}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
        hideBackdrop={submitting}
      >
        <DialogTitle>Add Job</DialogTitle>
        {openManualJobModal ? (
          <ManualJobModal
            toggle={toggle}
            onClose={handleClose}
            setSubmitting={setSubmitting}
          />
        ) : (
          <LinkJobModal
            toggle={toggle}
            onClose={handleClose}
            setSubmitting={setSubmitting}
          />
        )}
      </Dialog>
    </React.Fragment>
  );
}
