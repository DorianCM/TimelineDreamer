import { useState } from "react";

import Events from "../../../models/Events";
import Timeline from "../../../models/Timeline";
import DreamerDate from "../../../models/DreamerDate";
import EventController from "../../../controller/EventController";

import BoxModal from "../../common/BoxModal";
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import CustomNotification from "../../common/CustomNotification";
import { Button, Box } from '@mui/material';
import { Settings } from '@mui/icons-material';


interface typeProps {
  timeline: Timeline,
  event: Events,
  updateEvent: (event: Events) => void
}

function UpdateEventForm(props: typeProps) {
  const {timeline, event, updateEvent} = props;

  const [open, setOpen] = useState<boolean>(false);

  const [eventTitle, setEventTitle] = useState<string>(event.event_title);
  const [eventDescription, setEventDescription] = useState<string>(event.event_description);
  const [eventColor, setEventColor] = useState<string>(event.event_color);
  const [eventDateYear, setEventDateYear] = useState<number>(event.event_date.year);
  const [eventDateMonth, setEventDateMonth] = useState<number>(event.event_date.month);
  const [eventDateDay, setEventDateDay] = useState<number>(event.event_date.day);
  const [eventDateHour, setEventDateHour] = useState<number>(event.event_date.hour);
  const [eventDateMinute, setEventDateMinute] = useState<number>(event.event_date.minute);
  const [eventDateSecond, setEventDateSecond] = useState<number>(event.event_date.second);

  const [openNotification, setOpenNotification] = useState<boolean>(false);
  const [textNotification, setTextNotification] = useState<string>("");
  const [isErrorNotification, setIsErrorNotification] = useState<boolean>(false);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); 
    setOpen(true);
  };
  const handleClose = (event: React.MouseEvent<HTMLElement>) => { 
    event.stopPropagation();
    setOpen(false); 
  };

  const handleUpdateEvent = () => {
    if(eventTitle.length > 0) {
      const date = new DreamerDate(eventDateYear, eventDateMonth, eventDateDay, eventDateHour, eventDateMinute, eventDateSecond);
      const newE = new Events(event.event_id, event.project_id, event.timeline_id, eventTitle, eventDescription, eventColor, date);
      if(date.isBetween(timeline.timeline_start, timeline.timeline_end)) {
        EventController.updateEvent(newE)
        .then(res => {
          if(res instanceof Events) {
            updateEvent(newE);
            setOpen(false);
          }
          else if (res instanceof Error) {
            setOpenNotification(true);
            setTextNotification("Une erreur est survenue lors de tentative de modification ! "+ res.message);
            setIsErrorNotification(true);
          }
        })
        .catch((error: Error) => {
          setOpenNotification(true);
          setTextNotification("Une erreur est survenue lors de tentative de modification ! "+error.message);
          setIsErrorNotification(true);
        })
      }
    }
    else {
      setOpenNotification(true);
      setTextNotification("La date de l'évent doit être compris dans celles de la timeline !");
      setIsErrorNotification(true);
    }
  }

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined" startIcon={<Settings />}/>
      <Modal
          open={open} onClose={handleClose} aria-labelledby="Create Project Modal"
      >
        <BoxModal>
          <Box sx={{ flexDirection: 'column' }}>
            <h1>Mettre à jour les informations</h1>
            <TextField
              value={eventTitle} onChange={(e) => { setEventTitle(e.target.value); }} id="update_event_title"
              label="Nom"
              variant="standard"
            />
            <TextField
              value={eventDescription} onChange={(e) => { setEventDescription(e.target.value); }} id="update_event_description"
              label="Description"
              variant="standard"
            />
            <TextField
              value={eventColor} onChange={(e) => { setEventColor(e.target.value); }} id="update_event_color"
              label="Couleur"
              variant="standard"
            />
            <TextField
              value={eventDateYear} type='number' onChange={(e) => { setEventDateYear(+e.target.value); }} id="textfield_event_year"
              label="Année"
              variant="standard"
            />
            <TextField
              value={eventDateMonth} type='number' onChange={(e) => { setEventDateMonth(+e.target.value); }} id="textfield_event_month"
              label="Mois"
              variant="standard"
            />
            <TextField
              value={eventDateDay} type='number' onChange={(e) => { setEventDateDay(+e.target.value); }} id="textfield_event_day"
              label="Jour"
              variant="standard"
            />
            <TextField
              value={eventDateHour} type='number' onChange={(e) => { setEventDateHour(+e.target.value); }} id="textfield_event_hour"
              label="Heure"
              variant="standard"
            />
            <TextField
              value={eventDateMinute} type='number' onChange={(e) => { setEventDateMinute(+e.target.value); }} id="textfield_event_minute"
              label="Minute"
              variant="standard"
            />
            <TextField
              value={eventDateSecond} type='number' onChange={(e) => { setEventDateSecond(+e.target.value); }} id="textfield_event_second"
              label="Seconde"
              variant="standard"
            />
            <Button onClick={handleUpdateEvent} variant="contained" color="primary">
              Appliquer
            </Button>
          </Box>
        </BoxModal>
      </Modal>
      <CustomNotification open={openNotification} setOpen={setOpenNotification} text={textNotification} isError={isErrorNotification}/>
    </div>
  );
}

export default UpdateEventForm;