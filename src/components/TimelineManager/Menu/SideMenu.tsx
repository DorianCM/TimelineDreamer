import { useState } from 'react';

import Project from '../../../models/Project';
import Timeline from '../../../models/Timeline';
import Events from '../../../models/Events';

import TimelineController from '../../../controller/TimelineController';
import CustomNotification from '../../common/CustomNotification';
import TimelineCollapse from './TimelineCollapse';
import CreateTimelineForm from './CreateTimelineForm';

import { Box, Button, List, Typography } from '@mui/material';

interface typeProps {
  project: Project;
  timelines: Timeline[];
  events: Events[];
  setProject: (project: Project | null) => void;
  setTimelines: (timelines: Timeline[]) => void;
  managerAddTimeline: (timeline: Timeline) => void;
  managerUpdateTimeline: (timeline: Timeline) => void;
  managerRemoveTimeline: (timeline: Timeline) => void;
  managerAddEvent: (event: Events) => void;
  managerUpdateEvent: (event: Events) => void;
  managerRemoveEvent: (event: Events) => void;
}

function SideMenu(props: typeProps) {
  const { project, timelines, events, setProject, setTimelines, managerAddTimeline, managerUpdateTimeline, managerRemoveTimeline, managerAddEvent, managerUpdateEvent, managerRemoveEvent} = props;

  const [timelineBeingDragged, setTimelineBeingDragged] = useState<number>(0);

  const [openNotification, setOpenNotification] = useState<boolean>(false);
  const [textNotification, setTextNotification] = useState<string>("");
  const [isErrorNotification, setIsErrorNotification] = useState<boolean>(false);

  const addTimeline = (timeline: Timeline) => {
    managerAddTimeline(timeline);
    setOpenNotification(true);
    setTextNotification(timeline.timeline_title+" créée avec succès")
    setIsErrorNotification(false);
  }

  const updateTimeline = (timeline: Timeline) => {
    managerUpdateTimeline(timeline);
  }

  const removeTimeline = (timeline: Timeline) => {
    managerRemoveTimeline(timeline);
  }

  const addEvent = (event: Events) => {
    managerAddEvent(event);
    setOpenNotification(true);
    setTextNotification(event.event_title+" créé avec succès")
    setIsErrorNotification(false);
  }

  const updateEvent = (event: Events) => {
    managerUpdateEvent(event);
  }

  const removeEvent = (event: Events) => {
    managerRemoveEvent(event);
  }

  const dragTimelineStart = (timeline_id: number) => {
    setTimelineBeingDragged(timeline_id);
  }
  const changeOrder = (timeline_id: number) => {
    if(timelineBeingDragged !== timeline_id) {
      TimelineController.changeOrder(timelines, timelineBeingDragged, timeline_id)
      .then( res => {
        if(res instanceof Error) {
          setOpenNotification(true);
          setTextNotification("Erreur lors du changement d'ordre ! : "+res.message)
          setIsErrorNotification(true);
        }
        else {
          setTimelines([...res]);
        }
      })
      .catch((error: Error) => {
        setOpenNotification(true);
        setTextNotification("Erreur lors du changement d'ordre ! "+error.message);
        setIsErrorNotification(true);
      });
    }
  }

  const handleBack = () => {
    setProject(null);
  }

  return (
    <Box flexDirection='column'>
      <Button onClick={handleBack}>Retour au menu</Button>
      <Typography variant='body1'>{project.project_name}</Typography>

      <List>
      {timelines.sort((a, b) => a.timeline_order < b.timeline_order ? -1 : 1)
      .map( (t: Timeline) => {
        return (
          <TimelineCollapse updateTimeline={updateTimeline} addEvent={addEvent} removeTimeline={removeTimeline} updateEvent={updateEvent} removeEvent={removeEvent} dragTimelineStart={dragTimelineStart} changeOrder={changeOrder}
          timeline={t} events={events.filter((e: Events) => e.timeline_id === t.timeline_id)} key={"TimelineCollapse_"+t.timeline_id}/>
          )
        })}
      </List>
      
      <CreateTimelineForm project={project} nb_timelines={timelines.length} addTimeline={addTimeline}/>
        
      <CustomNotification open={openNotification} setOpen={setOpenNotification} text={textNotification} isError={isErrorNotification}/>
    </Box>
  )
}

export default SideMenu;