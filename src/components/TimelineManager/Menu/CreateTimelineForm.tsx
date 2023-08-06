import { useState } from "react";

import Project from "../../../models/Project";
import Timeline from "../../../models/Timeline";
import DreamerDate from "../../../models/DreamerDate";
import TimelineController from "../../../controller/TimelineController";

import BoxModal from "../../common/BoxModal";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CustomNotification from "../../common/CustomNotification";


interface typeProps {
  project: Project;
  nb_timelines: number;
  addTimeline: (timeline: Timeline) => void
}

function CreateTimelineForm(props: typeProps) {
  const {project, nb_timelines, addTimeline} = props;

  const [open, setOpen] = useState<boolean>(false);

  const [timelineTitle, setTimelineTitle] = useState<string>("");
  const [timelineColor, setTimelineColor] = useState<string>("");
  const [timelineStartYear, setTimelineStartYear] = useState<number>(0);
  const [timelineStartMonth, setTimelineStartMonth] = useState<number>(0);
  const [timelineStartDay, setTimelineStartDay] = useState<number>(0);
  const [timelineStartHour, setTimelineStartHour] = useState<number>(0);
  const [timelineStartMinute, setTimelineStartMinute] = useState<number>(0);
  const [timelineStartSecond, setTimelineStartSecond] = useState<number>(0);
  const [timelineEndYear, setTimelineEndYear] = useState<number>(0);
  const [timelineEndMonth, setTimelineEndMonth] = useState<number>(0);
  const [timelineEndDay, setTimelineEndDay] = useState<number>(0);
  const [timelineEndHour, setTimelineEndHour] = useState<number>(0);
  const [timelineEndMinute, setTimelineEndMinute] = useState<number>(0);
  const [timelineEndSecond, setTimelineEndSecond] = useState<number>(0);

  const [openNotification, setOpenNotification] = useState<boolean>(false);
  const [textNotification, setTextNotification] = useState<string>("");
  const [isErrorNotification, setIsErrorNotification] = useState<boolean>(false);

  const handleOpen = () => { 
    setOpen(true);
    setTimelineTitle("New Timeline");
    setTimelineColor("");
    setTimelineStartYear(0);
    setTimelineStartMonth(0);
    setTimelineStartDay(0);
    setTimelineStartHour(0);
    setTimelineStartMinute(0);
    setTimelineStartSecond(0);
    setTimelineEndYear(0);
    setTimelineEndMonth(0);
    setTimelineEndDay(0);
    setTimelineEndHour(0);
    setTimelineEndMinute(0);
    setTimelineEndSecond(0);
    
  };
  const handleClose = () => { setOpen(false); };

  const handleCreateTimeline = () => {
    if(timelineTitle.length > 0) {
      const order = nb_timelines+1;
      TimelineController.createTimeline(project.project_id, timelineTitle, timelineColor, order, new DreamerDate(timelineStartYear, timelineStartMonth, timelineStartDay, timelineStartHour, timelineStartMinute, timelineStartSecond), new DreamerDate(timelineEndYear, timelineEndMonth, timelineEndDay, timelineEndHour, timelineEndMinute, timelineEndSecond))
      .then(res => {
        if(res instanceof Timeline) {
          addTimeline(res);
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
  }

  return (
    <div>
      <Button onClick={handleOpen}>Ajouter une timeline</Button>
      <Modal
          open={open} onClose={handleClose} aria-labelledby="Create Project Modal"
      >
        <BoxModal>
          <Box sx={{ flexDirection: 'column' }}>
            <h1>Donner un nom, une couleur et les dates de début et de fin</h1>
            <TextField
              value={timelineTitle} onChange={(e) => { setTimelineTitle(e.target.value); }} id="textfield_timeline_title"
              label="Nom"
              variant="standard"
            />
            <TextField
              value={timelineColor} onChange={(e) => { setTimelineColor(e.target.value); }} id="textfield_timeline_color"
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
            <Button onClick={handleCreateTimeline} variant="contained" color="primary">
              Confirmer
            </Button>
          </Box>
        </BoxModal>
      </Modal>
      <CustomNotification open={openNotification} setOpen={setOpenNotification} text={textNotification} isError={isErrorNotification}/>
    </div>
  );
}

export default CreateTimelineForm;