import {Button, Typography} from '@mui/material';
import PlusIcon from '@components/icons/plusIcon';

type AddJobProps = {
  handleClickOpen?: () => void;
};
const AddJob = ({handleClickOpen}: AddJobProps) => {
  return (
    <Button
      onClick={handleClickOpen}
      variant="outlined"
      size="small"
      startIcon={<PlusIcon />}
    >
      <Typography variant="caption">Add Job</Typography>
    </Button>
  );
};

export default AddJob;
