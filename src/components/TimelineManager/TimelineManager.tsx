import React, {useEffect, useState} from 'react';
import Project from '../../models/Project';
import Timeline from '../../models/Timeline';
import Events from '../../models/Events';
import TimelineController from '../../controller/TimelineController';
import EventController from '../../controller/EventController';
import CustomNotification from '../common/CustomNotification';
import TimelineCollapse from './TimelineCollapse';

import { Box, Button, Collapse, Grid, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import GraphicsArea from './GraphicsArea';

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


  const handleBack = () => {
    setProject(null);
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
        <Grid item xs={2}>
          <Box flexDirection='column'>
            <Button onClick={handleBack}>Retour au menu</Button>
            <Typography variant='body1'>{project.project_name}</Typography>

            <List>
            {timelines.sort((a, b) => a.timeline_order < b.timeline_order ? 1 : -1)
            .map( (t: Timeline) => {
              return (
                <TimelineCollapse timeline={t} events={events.filter((e: Events) => e.timeline_id === t.timeline_id)} key={"TimelineCollapse_"+t.timeline_id}/>
              )
            })}
            </List>
            
          </Box>
        

        </Grid>
        <Grid item xs={10}>
          <GraphicsArea/>
        </Grid>
      </Grid>

      <CustomNotification open={openNotification} setOpen={setOpenNotification} text={textNotification} isError={isErrorNotification}></CustomNotification>
    </React.Fragment>
  )
}

export default TimelineManager;