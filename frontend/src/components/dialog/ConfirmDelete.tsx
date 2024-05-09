import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

type ConfirmDeleteProps = {
  open: boolean;
  onCancelClick: () => void;
  onDeleteClick: () => void;
};

const ConfirmDelete = ({
  open,
  onCancelClick,
  onDeleteClick,
}: ConfirmDeleteProps) => {
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this job?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onCancelClick}>
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={onDeleteClick}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDelete;
