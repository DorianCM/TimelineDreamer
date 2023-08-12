import React, { useState } from 'react';
import Timeline from '../../../models/Timeline';
import Events from '../../../models/Events';
import DreamerDate from '../../../models/DreamerDate';
import GraphicsEvent from './GraphicsEvent';
import { GraphicOptions } from '../../common/GraphicOptions';

import { Grid } from '@mui/material';

interface typeProps {
  eventsList: Events[];
  timeline: Timeline;
  differentDates: DreamerDate[];
  gapBetweenDates: number;
  options: GraphicOptions;
}

function EventsGroup(props: typeProps) {
  const { eventsList, timeline, differentDates, gapBetweenDates, options } = props;

  const [openHover, setOpenHover] = useState<boolean>(false);

  
  const onMouseEnter = (e: React.MouseEvent) => {
    setOpenHover(true);
  }
  const onMouseLeave = (e: React.MouseEvent) => {
    setOpenHover(false);
  }

  const width = (eventsList.length + 2) * options.sizeEvent;
  const height = (eventsList.length + 2) * options.sizeEvent;
  const left = -(options.sizeTimeline/2) + gapBetweenDates * (differentDates.findIndex(d => d.isEqual(eventsList[0].event_date)) - differentDates.findIndex(d => d.isEqual(timeline.timeline_start)));

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
      style={{
        width: options.sizeEvent, height: options.sizeEvent,
        backgroundColor: openHover ? '' : 'purple',
        bottom:(options.sizeTimeline - options.sizeEvent)/2, 
        left: left, position: 'absolute', zIndex: 10}}>
      <Grid container spacing={3}
        direction={'column'}
        justifyContent={'flex-start'}
        alignItems={'flex-start'}
        sx={{
          width: width,
          height: height,
          display: openHover ? 'flex' : 'none'}}>
        {eventsList.map((e: Events) => {
          return (
            <Grid item xs={6} key={'graphics_event_item_'+e.event_id}>
              <GraphicsEvent event={e} isInGroup={true} timeline={timeline} differentDates={differentDates} gapBetweenDates={gapBetweenDates} options={options}  key={'graphics_event_'+e.event_id}/>
            </Grid>
          )
        })}
      </Grid>
    </div> 
  )
}

export default EventsGroup;