import { useState } from 'react';
import Timeline from '../../models/Timeline';
import Events from '../../models/Events';

import { Box, Button, Collapse, Grid, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface typeProps {
  timeline: Timeline;
  events: Events[];
}

function TimelineCollapse(props: any) {
  const { timeline, events } = props;

  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box key={"Box_Timeline_"+timeline.timeline_id}>
      <ListItemButton onClick={handleClick} key={"ListItemButton_Timeline_"+timeline.timeline_id}>
        <ListItemText primary={timeline.timeline_title} key={"ListItemText_Timeline_"+timeline.timeline_id}/>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {events.sort((a: Events, b: Events) => a.event_date < b.event_date ? 1 : -1)
          .map( (e: Events) => {
            return (
              <ListItemButton sx={{ pl: 4 }} key={"ListItemButton_Event_"+e.event_id}>
                <ListItemText primary={e.event_title} key={"ListItemText_Event_"+e.event_id}/>
              </ListItemButton>
            )
          })}
        </List>
      </Collapse>
    </Box>
  )
}

export default TimelineCollapse;