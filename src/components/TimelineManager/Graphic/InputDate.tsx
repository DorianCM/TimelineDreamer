import React, { useState } from 'react';
import Events from '../../../models/Events';
import Timeline from '../../../models/Timeline';
import DreamerDate from '../../../models/DreamerDate';
import { GraphicOptions } from '../../common/GraphicOptions';
import { PartOptions } from '../../common/PartOptions';

import EventController from '../../../controller/EventController';
import BoxModal from '../../common/BoxModal';
import CustomNotification from '../../common/CustomNotification';

import { Box, Button, Modal, TextField } from '@mui/material';

interface typeProps {
  timeline: Timeline;
  timelines: Timeline[];
  date: DreamerDate;
  differentDates: DreamerDate[];
  gapBetweenDates: number;
  options: GraphicOptions;
  specifics: PartOptions;

  addEvent: (event: Events) => void
}

function InputDate(props: typeProps) {
  const { timeline, timelines, date, differentDates, gapBetweenDates, options, specifics, addEvent } = props;

  const [open, setOpen] = useState<boolean>(false);

  const [eventTitle, setEventTitle] = useState<string>("");
  const [eventDescription, setEventDescription] = useState<string>("");

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
              <Button onClick={handleCreateEvent} variant="contained" color="primary">
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