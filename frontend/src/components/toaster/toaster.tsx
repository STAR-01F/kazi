import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ToasterProps from 'src/@types/toasterProps';


const Toaster = ({open, handleClose, message, severity}: ToasterProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      style={{marginTop: '50px'}}
    >
      <Alert onClose={handleClose} severity={severity} sx={{width: '100%'}}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toaster;
