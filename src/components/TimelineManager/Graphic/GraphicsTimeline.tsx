import React from 'react';
import Timeline from '../../../models/Timeline';
import Events from '../../../models/Events';
import DreamerDate from '../../../models/DreamerDate';
import { GraphicOptions } from '../../common/GraphicOptions';
import GraphicsEvent from './GraphicsEvent';

interface typeProps {
  timeline: Timeline;
  events: Events[];
  differentDates: DreamerDate[];
  order: number;
  heightScreen: number
  gapBetweenDates: number;
  options: GraphicOptions;
}

function GraphicsTimeline(props: typeProps) {
  const { timeline, events, differentDates, order, heightScreen, gapBetweenDates, options } = props;

  const verticalPosition: number = heightScreen/2+options.gapBetweenTimeline*order;
  const width = gapBetweenDates * (differentDates.findIndex(d => d.isEqual(timeline.timeline_end)) - differentDates.findIndex(d => d.isEqual(timeline.timeline_start)));
  const left = options.paddingArea + gapBetweenDates * differentDates.findIndex(d => d.isEqual(timeline.timeline_start));

  return (
    <React.Fragment>
      <div style={{width: width+'px', height: options.sizeTimeline+'px', backgroundColor: 'red', 
                    top: verticalPosition+"px", 
                    left: left+'px', position: 'absolute'}} key={'timeline_'+timeline.timeline_id}>

        {timeline.timeline_id+" "+ timeline.timeline_order + " " +timeline.timeline_title}

        {events.map((e: Events) => {
          return (
            <GraphicsEvent event={e} timeline={timeline} differentDates={differentDates} gapBetweenDates={gapBetweenDates} options={options}  key={'graphics_event_'+e.event_id}/>
            )
        })}
      </div>
    </React.Fragment>
  )
}

export default GraphicsTimeline;