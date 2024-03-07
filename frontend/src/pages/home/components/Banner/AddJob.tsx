import {Button, Typography} from '@mui/material';
import PlusIcon from '@components/icons/plusIcon';

type AddJobProps = {
  handleClickOpen?: () => void;
};
const AddJob = ({handleClickOpen}: AddJobProps) => {
  return (
    <Button
      onClick={handleClickOpen}
      variant="contained"
      startIcon={<PlusIcon />}
    >
      <Typography variant="body2">Add Job</Typography>
    </Button>
  );
};

export default AddJob;
