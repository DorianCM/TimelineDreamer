import React, { useState } from 'react';
import Events from '../../../models/Events';
import Timeline from '../../../models/Timeline';
import Merge from '../../../models/Merge';
import DreamerDate from '../../../models/DreamerDate';
import { GraphicOptions } from '../../common/GraphicOptions';
import { PartOptions } from '../../common/PartOptions';

import EventController from '../../../controller/EventController';
import MergeController from '../../../controller/MergeController';
import BoxModal from '../../common/BoxModal';
import CustomNotification from '../../common/CustomNotification';

import { Box, Button, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField } from '@mui/material';

interface typeProps {
  timeline: Timeline;
  timelines: Timeline[];
  date: DreamerDate;
  differentDates: DreamerDate[];
  gapBetweenDates: number;
  options: GraphicOptions;
  specifics: PartOptions;

  addEvent: (event: Events) => void
  addMerge: (merge: Merge) => void
}

function InputDate(props: typeProps) {
  const { timeline, timelines, date, differentDates, gapBetweenDates, options, specifics, addEvent, addMerge } = props;

  const [open, setOpen] = useState<boolean>(false);

  const [eventTitle, setEventTitle] = useState<string>("");
  const [eventDescription, setEventDescription] = useState<string>("");

  const [timelineSelected, setTimelineSelected] = useState<string>("")

  const [openNotification, setOpenNotification] = useState<boolean>(false);
  const [textNotification, setTextNotification] = useState<string>("");
  const [isErrorNotification, setIsErrorNotification] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(true);
    setEventTitle("");
    setEventDescription("");
  };
  
  const handleClose = () => { setOpen(false); };

  const handleCreateEvent = () => {
    if(eventTitle.length > 0) {
      EventController.createEvent(timeline.project_id, timeline.timeline_id, eventTitle, eventDescription, 'black', date)
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
  }

  const handleSelectTimeline = (event: SelectChangeEvent<string>) => {
    setTimelineSelected(event.target.value);
  }
  const handleCreateMerge = () => {
    if(timelineSelected !== "") {
      MergeController.createMerge(timeline.project_id, timeline.timeline_id, Number(timelineSelected), date, true)
      .then(res => {
        if(res instanceof Merge) {
          addMerge(res);
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


  const left = -(options.sizeInputDate/2) + gapBetweenDates * (differentDates.findIndex(d => d.isEqual(date)) - differentDates.findIndex(d => d.isEqual(specifics.start)));

  return (
    <React.Fragment>
      <div onClick={handleClick}  style={{ 
        left: left,
        height: options.sizeTimeline,
        width: options.sizeInputDate,
        display: 'inline-block', 
        position: 'absolute',
        zIndex: 2}}
        className='inputDate'/>

      <Modal
        open={open} onClose={handleClose} aria-labelledby="InputDate Modal"
      >
        <BoxModal>
          <Box sx={{ flexDirection: 'row' }}>
            <Box sx={{ flexDirection: 'column' }}>
              <h1>Ajouter un évent à cette date ?</h1>
              <h2>{date.toString()}</h2>
              <TextField
                value={eventTitle} onChange={(e) => { setEventTitle(e.target.value); }}
                label="Titre"
                variant="standard"
              />
              <TextField
                value={eventDescription} onChange={(e) => { setEventDescription(e.target.value); }}
                label="Description"
                variant="standard"
              />
              <Button disabled={eventTitle === "" || eventDescription === ""} onClick={handleCreateEvent} variant="contained" color="primary">
                Confirmer
              </Button>
            </Box>
            <Box sx={{ flexDirection: 'column' }}>
              <h1>Créer un merge à cette date ?</h1>
              <h2>Choisissez une timeline cible</h2>
              <InputLabel>Timeline de destination</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={timelineSelected}
                label="Timeline de destination"
                onChange={handleSelectTimeline}
              >
                <MenuItem value=""/>
                {timelines.filter((t: Timeline) => t.timeline_id !== timeline.timeline_id).map((t: Timeline) => {
                  return (
                    <MenuItem value={t.timeline_id} key={"MenuItem_InputDate_"+t.timeline_id}>
                      {t.timeline_title}
                    </MenuItem>
                  )
                })}
              </Select>
              
              <Button disabled={timelineSelected === ""} onClick={handleCreateMerge} variant="contained" color="primary">
                Confirmer
              </Button>
            </Box>
          </Box>
        </BoxModal>
      </Modal>
      <CustomNotification open={openNotification} setOpen={setOpenNotification} text={textNotification} isError={isErrorNotification}/>
    </React.Fragment>
  );
}

export default InputDate;