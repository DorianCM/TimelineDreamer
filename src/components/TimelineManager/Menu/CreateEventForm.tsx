import { useState } from "react";

import Timeline from "../../../models/Timeline";
import Events from "../../../models/Events";
import DreamerDate from "../../../models/DreamerDate";
import EventController from "../../../controller/EventController";

import BoxModal from "../../common/BoxModal";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CustomNotification from "../../common/CustomNotification";

import AddIcon from '@mui/icons-material/Add';


interface typeProps {
  timeline: Timeline,
  addEvent: (event: Events) => void
}

function CreateEventForm(props: typeProps) {
  const {timeline, addEvent} = props;

  const [open, setOpen] = useState<boolean>(false);

  const [eventTitle, setEventTitle] = useState<string>("");
  const [eventDescription, setEventDescription] = useState<string>("");
  const [eventColor, setEventColor] = useState<string>("");
  const [eventDateYear, setEventDateYear] = useState<number>(0);
  const [eventDateMonth, setEventDateMonth] = useState<number>(0);
  const [eventDateDay, setEventDateDay] = useState<number>(0);
  const [eventDateHour, setEventDateHour] = useState<number>(0);
  const [eventDateMinute, setEventDateMinute] = useState<number>(0);
  const [eventDateSecond, setEventDateSecond] = useState<number>(0);

  const [openNotification, setOpenNotification] = useState<boolean>(false);
  const [textNotification, setTextNotification] = useState<string>("");
  const [isErrorNotification, setIsErrorNotification] = useState<boolean>(false);

  const handleOpen = () => { 
    setOpen(true);
    setEventTitle("New Event");
    setEventDescription("");
    setEventColor("");
    setEventDateYear(0);
    setEventDateMonth(0);
    setEventDateDay(0);
    setEventDateHour(0);
    setEventDateMinute(0);
    setEventDateSecond(0);
  };
  const handleClose = () => { setOpen(false); };

  const handleCreateEvent = () => {
    if(eventTitle.length > 0) {
      const date = new DreamerDate(eventDateYear, eventDateMonth, eventDateDay, eventDateHour, eventDateMinute, eventDateSecond);
      if(date.isBetween(timeline.timeline_start, timeline.timeline_end)) {
        EventController.createEvent(timeline.project_id, timeline.timeline_id, eventTitle, eventDescription, eventColor, date)
        .then(res => {
          if(res instanceof Events) {
            addEvent(res);
            setOpen(false);
          }
          else if (res instanceof Error) {
            setOpenNotification(true);
            setTextNotification("Une erreur est survenue lors de tentative de création ! "+ res.message);
            setIsErrorNotification(true);
          }
        })
        .catch((error: Error) => {
          setOpenNotification(true);
          setTextNotification("Une erreur est survenue lors de tentative de création ! "+error.message);
          setIsErrorNotification(true);
        })
      }
      else {
        setOpenNotification(true);
        setTextNotification("La date de l'évent doit être compris dans celles de la timeline !");
        setIsErrorNotification(true);
      }
    }
  }

  return (
    <div>
      <Button onClick={handleOpen} startIcon={<AddIcon />}/>
      <Modal
          open={open} onClose={handleClose} aria-labelledby="Create Project Modal"
      >
        <BoxModal>
          <Box sx={{ flexDirection: 'column' }}>
            <h1>Donner un nom, une couleur et les dates de début et de fin</h1>
            <TextField
              value={eventTitle} onChange={(e) => { setEventTitle(e.target.value); }} id="textfield_event_title"
              label="Nom"
              variant="standard"
            />
            <TextField
              value={eventDescription} onChange={(e) => { setEventDescription(e.target.value); }} id="textfield_event_description"
              label="Description"
              variant="standard"
            />
            <TextField
              value={eventColor} onChange={(e) => { setEventColor(e.target.value); }} id="textfield_event_color"
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
            <Button onClick={handleCreateEvent} variant="contained" color="primary">
              Confirmer
            </Button>
          </Box>
        </BoxModal>
      </Modal>
      <CustomNotification open={openNotification} setOpen={setOpenNotification} text={textNotification} isError={isErrorNotification}/>
    </div>
  );
}

export default CreateEventForm;