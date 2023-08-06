import React, { useState } from 'react';
import Timeline from '../../../models/Timeline';
import Events from '../../../models/Events';
import TimelineController from '../../../controller/TimelineController';

import UpdateTimelineForm from './UpdateTImelineForm';
import CreateEventForm from './CreateEventForm';
import CustomNotification from '../../common/CustomNotification';
import ConfirmationDialog from '../../common/ConfirmationDialog';
import EventCollapse from './EventCollapse';

import { Box, Button, Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import { ExpandLess, ExpandMore, Delete} from '@mui/icons-material';

interface typeProps {
  timeline: Timeline;
  events: Events[];
  updateTimeline: (timeline: Timeline) => void
  removeTimeline: (timeline: Timeline) => void
  addEvent: (event: Events) => void
  updateEvent: (event: Events) => void
  removeEvent: (event: Events) => void
  dragTimelineStart: (timeline_id: number) => void
  changeOrder: (timeline_id: number) => void
}

function TimelineCollapse(props: typeProps) {
  const { timeline, events, updateTimeline, removeTimeline, addEvent, updateEvent, removeEvent, dragTimelineStart, changeOrder} = props;

  const [open, setOpen] = useState(true);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  
  const [openNotification, setOpenNotification] = useState<boolean>(false);
  const [textNotification, setTextNotification] = useState<string>("");
  const [isErrorNotification, setIsErrorNotification] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(!open);
  };
  
  const handleClickDelete = () => {
    setOpenDelete(true);
  }

  const deleteTimeline = (confirmed: boolean) => {
    if(confirmed) {
      TimelineController.deleteTimeline(timeline.timeline_id)
      .then(res => {
        if(res) {
          removeTimeline(timeline);
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

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    changeOrder(timeline.timeline_id);
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }
  
  const handleDragStart = () => {
    dragTimelineStart(timeline.timeline_id);
  }


  return (
    <Box draggable onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} key={"Box_Timeline_"+timeline.timeline_id} data-key={timeline.timeline_id}>
      <ListItemButton key={"ListItemButton_Timeline_"+timeline.timeline_id}>
        <ListItemText primary={timeline.timeline_id+" "+ timeline.timeline_order + " " +timeline.timeline_title} key={"ListItemText_Timeline_"+timeline.timeline_id}/>
        <UpdateTimelineForm timeline={timeline} events={events} updateTimeline={updateTimeline}/>
        <Button onClick={handleClickDelete}  startIcon={<Delete />}/>
        {open ? <ExpandLess onClick={handleClick} /> : <ExpandMore onClick={handleClick} />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {events.sort((a: Events, b: Events) => a.event_date < b.event_date ? -1 : 1)
          .map( (e: Events) => {
            return (
              <EventCollapse timeline={timeline} event={e} updateEvent={updateEvent} removeEvent={removeEvent} key={"Event_Collapse_"+e.event_id}/>
            )
          })}
          <ListItemButton sx={{ pl: 4 }} key={"ListItemButton_Event_Add"}>
            <CreateEventForm timeline={timeline} addEvent={addEvent}/>
          </ListItemButton>
        </List>
      </Collapse>
      <ConfirmationDialog
        open={openDelete}
        onClose={deleteTimeline}
        title={"Supprimer la timeline "+timeline.timeline_title+" ?"}
        description={"La suppression est définitive, et tous les events associés seront également supprimés ! Voulez-vous continuer ?"}
      />
      <CustomNotification open={openNotification} setOpen={setOpenNotification} text={textNotification} isError={isErrorNotification}/>
    </Box>
  )
}

export default TimelineCollapse;