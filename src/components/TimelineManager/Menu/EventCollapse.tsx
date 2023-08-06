import { useState } from 'react';
import EventController from "../../../controller/EventController";
import Events from "../../../models/Events";
import Timeline from '../../../models/Timeline';

import CustomNotification from "../../common/CustomNotification";
import UpdateEventForm from "./UpdateEventForm";
import ConfirmationDialog from '../../common/ConfirmationDialog';

import { Button, ListItemButton, ListItemText } from "@mui/material";
import { Delete} from '@mui/icons-material';

interface typeProps {
  timeline: Timeline;
  event: Events;
  updateEvent: (event: Events) => void;
  removeEvent: (event: Events) => void;
}

function EventCollapse(props: typeProps) {
  const {timeline, event, updateEvent, removeEvent} = props;
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  
  const [openNotification, setOpenNotification] = useState<boolean>(false);
  const [textNotification, setTextNotification] = useState<string>("");
  const [isErrorNotification, setIsErrorNotification] = useState<boolean>(false);

  const handleClickDelete = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); 
    setOpenDelete(true);
  }

  const deleteEvent = (confirmed: boolean) => {
    if(confirmed) {
      EventController.deleteEvent(event.event_id)
      .then(res => {
        if(res) {
          removeEvent(event);
        } else {
          setOpenNotification(true);
          setTextNotification("Une erreur est survenue lors de tentative de suppression !");
          setIsErrorNotification(true);
        }
      })
      .catch((error: Error) => {
        setOpenNotification(true);
        setTextNotification("Une erreur est survenue lors de tentative de suppression ! "+error.message);
        setIsErrorNotification(true);
      });

      setOpenDelete(false);
    }
    else {
      setOpenDelete(false);
    }
  }

  return (
    <ListItemButton sx={{ pl: 4 }} key={"ListItemButton_Event_"+event.event_id}>
      <ListItemText primary={event.event_title} key={"ListItemText_Event_"+event.event_id}/>
      <UpdateEventForm timeline={timeline} event={event} updateEvent={updateEvent} key={"UpdateEventForm_Event_"+event.event_id}/>
      <Button onClick={handleClickDelete}  startIcon={<Delete />} key={"Delete_Event_"+event.event_id}/>

      <ConfirmationDialog
        open={openDelete}
        onClose={deleteEvent}
        title={"Supprimer l'event "+event.event_title+" ?"}
        description={"La suppression est définitive ! Voulez-vous continuer ?"}
      />
      <CustomNotification open={openNotification} setOpen={setOpenNotification} text={textNotification} isError={isErrorNotification}/>
    </ListItemButton>
  )
}

export default EventCollapse;