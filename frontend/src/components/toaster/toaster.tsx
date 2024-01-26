import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

type Severity = "error" | "success" ;

const Toaster = ({ open, handleClose, message, severity }: { open: boolean, handleClose: any, message: string, severity:Severity }) => {
    return (
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
  <Alert
    onClose={handleClose}
    severity={severity}
    variant="filled"
    sx={{ width: '100%'}}
  >
    {message}
  </Alert>
</Snackbar>
    )
}

export default Toaster;
