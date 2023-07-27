import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export interface typeProps {
  open: boolean;
  onClose: (value: boolean) => void;
  title: string;
  description: string;
}

export default function ConfirmationDialog(props: typeProps) {
  const { onClose, open, title, description } = props;

  const handleConfirm = () => {
    onClose(true);
  };

  const handleCancel = () => {
    onClose(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
    >
      <DialogTitle> {title} </DialogTitle>
      <DialogContent>
        <DialogContentText> {description} </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} autoFocus> Annuler </Button>
        <Button onClick={handleConfirm}> Confirmer </Button>
      </DialogActions>
    </Dialog>
  );
}