import React, { useState } from 'react';
import Timeline from '../../../models/Timeline';
import Events from '../../../models/Events';
import DreamerDate from '../../../models/DreamerDate';
import { GraphicOptions } from '../../common/GraphicOptions';

import { Box, Typography } from '@mui/material';

interface typeProps {
  event: Events;
  timeline: Timeline;
  differentDates: DreamerDate[];
  gapBetweenDates: number;
  options: GraphicOptions;
}

function GraphicsEvent(props: typeProps) {
  const { event, timeline, differentDates, gapBetweenDates, options } = props;

  const [openHover, setOpenHover] = useState<boolean>(false);

  const left = -(options.sizeTimeline/2) + gapBetweenDates * (differentDates.findIndex(d => d.isEqual(event.event_date)) - differentDates.findIndex(d => d.isEqual(timeline.timeline_start)));

  const onMouseEnter = (e: React.MouseEvent) => {
    setOpenHover(true);
  }
  const onMouseLeave = (e: React.MouseEvent) => {
    setOpenHover(false);
  }

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{width: options.sizeEvent+'px', height: options.sizeEvent+'px', backgroundColor: 'green', 
                bottom:-(options.sizeEvent/2 - options.sizeTimeline)+"px", 
                left: left+'px', position: 'absolute', zIndex: 10}}>
      <Box hidden={!openHover} sx={{ flexDirection: 'column', backgroundColor: 'white' }}>
        <Typography variant="caption">{event.event_title}</Typography>
        <Typography variant="body1">{event.event_description}</Typography>
        <Typography variant="body1">{event.event_date.toString()}</Typography>
      </Box>
    </div> 
  )
}

export default GraphicsEvent;