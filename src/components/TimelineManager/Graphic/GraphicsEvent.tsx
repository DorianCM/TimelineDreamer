import React, { useState } from 'react';
import Timeline from '../../../models/Timeline';
import Events from '../../../models/Events';
import DreamerDate from '../../../models/DreamerDate';
import { GraphicOptions } from '../../common/GraphicOptions';

import { Box, Typography } from '@mui/material';

interface typeProps {
  event: Events;
  isInGroup: boolean;
  timeline: Timeline;
  differentDates: DreamerDate[];
  gapBetweenDates: number;
  options: GraphicOptions;
}

function GraphicsEvent(props: typeProps) {
  const { event, isInGroup, timeline, differentDates, gapBetweenDates, options } = props;

  const [openHover, setOpenHover] = useState<boolean>(false);
  
  const onMouseEnter = (e: React.MouseEvent) => {
    setOpenHover(true);
  }
  const onMouseLeave = (e: React.MouseEvent) => {
    setOpenHover(false);
  }

  let left = 0;
  let bottom = 0;
  if(!isInGroup) {
    left = -(options.sizeEvent/2) + gapBetweenDates * (differentDates.findIndex(d => d.isEqual(event.event_date)) - differentDates.findIndex(d => d.isEqual(timeline.timeline_start)));
    bottom = (options.sizeTimeline - options.sizeEvent)/2;
  }

  return (
    <React.Fragment>
      {isInGroup ? (

        <Box onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{width: options.sizeEvent, height: options.sizeEvent,
          backgroundColor: 'green', 
          zIndex: 10,
          margin: 10}}>
          <Box hidden={!openHover} sx={{ flexDirection: 'column', backgroundColor: 'white'}}>
            <Typography variant="caption">{event.event_title}</Typography>
            <Typography variant="body1">{event.event_description}</Typography>
            <Typography variant="body1">{event.event_date.toString()}</Typography>
          </Box>
        </Box>
      ) : (
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{width: options.sizeEvent, height: options.sizeEvent,
          backgroundColor: 'green', 
          bottom: bottom, 
          left: left, position: 'absolute', zIndex: 10}}>
          <Box hidden={!openHover} sx={{ flexDirection: 'column', backgroundColor: 'white' }}>
            <Typography variant="caption">{event.event_title}</Typography>
            <Typography variant="body1">{event.event_description}</Typography>
            <Typography variant="body1">{event.event_date.toString()}</Typography>
          </Box>
        </div>
      )}
    </React.Fragment>
    
  )
}

export default GraphicsEvent;