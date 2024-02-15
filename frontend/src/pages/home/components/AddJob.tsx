import {Button} from '@mui/material';
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
      Add Job
    </Button>
  );
};

export default AddJob;
