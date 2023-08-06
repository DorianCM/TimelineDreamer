import { useState } from "react";

import Events from "../../../models/Events";
import Timeline from "../../../models/Timeline";
import DreamerDate from "../../../models/DreamerDate";
import TimelineController from "../../../controller/TimelineController";

import BoxModal from "../../common/BoxModal";
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import CustomNotification from "../../common/CustomNotification";
import { Button, Box } from '@mui/material';
import { Settings } from '@mui/icons-material';


interface typeProps {
  timeline: Timeline;
  events: Events[]
  updateTimeline: (timeline: Timeline) => void;
}

function UpdateTimelineForm(props: typeProps) {
  const {timeline, events, updateTimeline} = props;

  const [open, setOpen] = useState<boolean>(false);

  const [timelineTitle, setTimelineTitle] = useState<string>(timeline.timeline_title);
  const [timelineColor, setTimelineColor] = useState<string>(timeline.timeline_color);
  const [timelineStartYear, setTimelineStartYear] = useState<number>(timeline.timeline_start.year);
  const [timelineStartMonth, setTimelineStartMonth] = useState<number>(timeline.timeline_start.month);
  const [timelineStartDay, setTimelineStartDay] = useState<number>(timeline.timeline_start.day);
  const [timelineStartHour, setTimelineStartHour] = useState<number>(timeline.timeline_start.hour);
  const [timelineStartMinute, setTimelineStartMinute] = useState<number>(timeline.timeline_start.minute);
  const [timelineStartSecond, setTimelineStartSecond] = useState<number>(timeline.timeline_start.second);
  const [timelineEndYear, setTimelineEndYear] = useState<number>(timeline.timeline_end.year);
  const [timelineEndMonth, setTimelineEndMonth] = useState<number>(timeline.timeline_end.month);
  const [timelineEndDay, setTimelineEndDay] = useState<number>(timeline.timeline_end.day);
  const [timelineEndHour, setTimelineEndHour] = useState<number>(timeline.timeline_end.hour);
  const [timelineEndMinute, setTimelineEndMinute] = useState<number>(timeline.timeline_end.minute);
  const [timelineEndSecond, setTimelineEndSecond] = useState<number>(timeline.timeline_end.second);

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

  const handleUpdateTimeline = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); 
    if(timelineTitle.length > 0) {
      const dateStart = new DreamerDate(timelineStartYear, timelineStartMonth, timelineStartDay, timelineStartHour, timelineStartMinute, timelineStartSecond);
      const dateEnd = new DreamerDate(timelineEndYear, timelineEndMonth, timelineEndDay, timelineEndHour, timelineEndMinute, timelineEndSecond);
      let containAllEvents = true;

      events.forEach(e => {
        if(!e.event_date.isBetween(dateStart, dateEnd))
          containAllEvents = false
      });
      if(containAllEvents) {
        const newT = new Timeline(timeline.timeline_id, timeline.project_id, timelineTitle, timeline.timeline_order, timelineColor, dateStart, dateEnd);
        TimelineController.updateTimeline(newT)
        .then(res => {
          if(res instanceof Timeline) {
            updateTimeline(newT);
            setOpen(false);
          }
          else if(res instanceof Error) {
            setOpenNotification(true);
            setTextNotification("Une erreur est survenue lors de tentative de modification ! "+ res.message);
            setIsErrorNotification(true);
          }
        })
        .catch((error: Error) => {
          setOpenNotification(true);
          setTextNotification("Une erreur est survenue lors de tentative de modification ! "+error.message);
          setIsErrorNotification(true);
        });
      }
      else {
        setOpenNotification(true);
        setTextNotification("Les dates doivent borner celles des events associés !");
        setIsErrorNotification(true);
      }
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
              value={timelineTitle} onChange={(e) => { setTimelineTitle(e.target.value); }} id="update_timeline_title"
              label="Nom"
              variant="standard"
            />
            <TextField
              value={timelineColor} onChange={(e) => { setTimelineColor(e.target.value); }} id="update_timeline_color"
              label="Couleur"
              variant="standard"
            />
            <TextField
              value={timelineStartYear} type='number' onChange={(e) => { setTimelineStartYear(+e.target.value); }} id="textfield_start_year"
              label="Année"
              variant="standard"
            />
            <TextField
              value={timelineStartMonth} type='number' onChange={(e) => { setTimelineStartMonth(+e.target.value); }} id="textfield_start_month"
              label="Mois"
              variant="standard"
            />
            <TextField
              value={timelineStartDay} type='number' onChange={(e) => { setTimelineStartDay(+e.target.value); }} id="textfield_start_day"
              label="Jour"
              variant="standard"
            />
            <TextField
              value={timelineStartHour} type='number' onChange={(e) => { setTimelineStartHour(+e.target.value); }} id="textfield_start_hour"
              label="Heure"
              variant="standard"
            />
            <TextField
              value={timelineStartMinute} type='number' onChange={(e) => { setTimelineStartMinute(+e.target.value); }} id="textfield_start_minute"
              label="Minute"
              variant="standard"
            />
            <TextField
              value={timelineStartSecond} type='number' onChange={(e) => { setTimelineStartSecond(+e.target.value); }} id="textfield_start_second"
              label="Seconde"
              variant="standard"
            />
            <TextField
              value={timelineEndYear} type='number' onChange={(e) => { setTimelineEndYear(+e.target.value); }} id="textfield_end_year"
              label="Année"
              variant="standard"
            />
            <TextField
              value={timelineEndMonth} type='number' onChange={(e) => { setTimelineEndMonth(+e.target.value); }} id="textfield_end_month"
              label="Mois"
              variant="standard"
            />
            <TextField
              value={timelineEndDay} type='number' onChange={(e) => { setTimelineEndDay(+e.target.value); }} id="textfield_end_day"
              label="Jour"
              variant="standard"
            />
            <TextField
              value={timelineEndHour} type='number' onChange={(e) => { setTimelineEndHour(+e.target.value); }} id="textfield_end_hour"
              label="Heure"
              variant="standard"
            />
            <TextField
              value={timelineEndMinute} type='number' onChange={(e) => { setTimelineEndMinute(+e.target.value); }} id="textfield_end_minute"
              label="Minute"
              variant="standard"
            />
            <TextField
              value={timelineEndSecond} type='number' onChange={(e) => { setTimelineEndSecond(+e.target.value); }} id="textfield_end_second"
              label="Seconde"
              variant="standard"
            />
            <Button onClick={handleUpdateTimeline} variant="contained" color="primary">
              Appliquer
            </Button>
          </Box>
        </BoxModal>
      </Modal>
      <CustomNotification open={openNotification} setOpen={setOpenNotification} text={textNotification} isError={isErrorNotification}/>
    </div>
  );
}

export default UpdateTimelineForm;