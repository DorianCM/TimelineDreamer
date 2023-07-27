import { Alert, Snackbar, SnackbarOrigin } from "@mui/material";

export interface typeProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  text: string;
  isError: boolean;
}

export default function CustomNotification(props: typeProps) {
  const { open, setOpen, text, isError } = props;

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  
  const vertical = 'top';
  const horizontal = 'center';

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
      <Alert onClose={handleClose} severity={isError ? "error" : "success"} sx={{ width: '100%' }}>
        {text}
      </Alert>
    </Snackbar>
  );
}