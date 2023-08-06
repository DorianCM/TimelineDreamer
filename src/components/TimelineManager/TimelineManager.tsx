import React, {useEffect, useState} from 'react';

import Project from '../../models/Project';
import Timeline from '../../models/Timeline';
import Events from '../../models/Events';

import TimelineController from '../../controller/TimelineController';
import CustomNotification from '../common/CustomNotification';
import EventController from '../../controller/EventController';
import SideMenu from './Menu/SideMenu';
import GraphicsArea from './Graphic/GraphicsArea';

import { Grid } from '@mui/material';

interface typeProps {
  project: Project;
  setProject: (project: Project | null) => void;
}

function TimelineManager(props: typeProps) {
  const { project, setProject } = props;

  const [timelines, setTimelines] = useState<Timeline[]>([]);
  const [events, setEvents] = useState<Events[]>([]);

  const [openNotification, setOpenNotification] = useState<boolean>(false);
  const [textNotification, setTextNotification] = useState<string>("");
  const [isErrorNotification, setIsErrorNotification] = useState<boolean>(false);

  const addTimeline = (timeline: Timeline) => {
    setTimelines([...timelines, timeline ]);
  }

  const updateTimeline = (timeline: Timeline) => {
    let old_timeline = timelines.find((t: Timeline) => { return t.timeline_id === timeline.timeline_id });
    if(old_timeline?.events)
      timeline.events = old_timeline?.events;
    setTimelines([...timelines.filter((t: Timeline) => { return t.timeline_id !== timeline.timeline_id }), timeline]);
  }

  const removeTimeline = (timeline: Timeline) => {
    setTimelines(timelines.filter((t: Timeline) => { return t.timeline_id !== timeline.timeline_id }));
    setEvents(events.filter((e: Events) => { return e.timeline_id !== timeline.timeline_id }));
  }

  const addEvent = (event: Events) => {
    setEvents([...events, event ]);
  }

  const updateEvent = (event: Events) => {
    setEvents([...events.filter((e: Events) => { return e.event_id !== event.event_id }), event]);
  }

  const removeEvent = (event: Events) => {
    setEvents(events.filter((e: Events) => { return e.event_id !== event.event_id }));
  }

  useEffect(() => {
    TimelineController.getTimelinesByProjectId(project.project_id)
    .then(res => {
      if(res instanceof Error) {
        setOpenNotification(true);
        setTextNotification("Une erreur est survenue lors du chargement ! "+res.message);
        setIsErrorNotification(true);
      }
      else {
        setTimelines(res);
        EventController.getEventsByProjectId(project.project_id)
        .then(res => {
          if(res instanceof Error) {
            setOpenNotification(true);
            setTextNotification("Une erreur est survenue lors du chargement ! "+res.message);
            setIsErrorNotification(true);
          }
          else {
            setEvents(res);
          }
        })
      }
    })
    .catch((error: Error) => {
      setOpenNotification(true);
        setTextNotification("Une erreur est survenue lors du chargement ! "+error.message);
        setIsErrorNotification(true);
    })
  }, [project.project_id])


  return (
    <React.Fragment>
      <Grid container
        direction="row"
      >
        <Grid item xs={3}>
          <SideMenu project={project} timelines={timelines} events={events} setProject={setProject} setTimelines={setTimelines} managerAddTimeline={addTimeline} managerUpdateTimeline={updateTimeline} managerRemoveTimeline={removeTimeline} managerAddEvent={addEvent} managerUpdateEvent={updateEvent} managerRemoveEvent={removeEvent}/>
        </Grid>
        <Grid item xs={9}>
          <GraphicsArea timelines={timelines} events={events}/>
        </Grid>
      </Grid>

      <CustomNotification open={openNotification} setOpen={setOpenNotification} text={textNotification} isError={isErrorNotification}/>
    </React.Fragment>
  )
}

export default TimelineManager;