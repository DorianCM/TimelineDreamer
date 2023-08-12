import React from 'react';
import Timeline from '../../../models/Timeline';
import Events from '../../../models/Events';
import DreamerDate from '../../../models/DreamerDate';
import { GraphicOptions } from '../../common/GraphicOptions';
import GraphicsEvent from './GraphicsEvent';
import EventsGroup from './EventsGroup';

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
  const ownDifferentesDates = differentDates.filter((d: DreamerDate) => events.some(e => e.event_date.isEqual(d)))
  
  return (
    <React.Fragment>
      <div style={{width: width, height: options.sizeTimeline, backgroundColor: 'red', 
                    top: verticalPosition, 
                    left: left, position: 'absolute'}} key={'timeline_'+timeline.timeline_id}>

        {timeline.timeline_id+" "+ timeline.timeline_order + " " +timeline.timeline_title}

        {/* {events.map((e: Events) => {
          //Le faire dans le sens des différentes dates ?
          // Si plusieurs au même endroits, faire quelque chose qui s'écarte, et ensuite on peut hover précisémment
          // Pour les merges, ajouter les évenements qui sont après le merge, et avant les éventuelles non-merges
          return (
            <GraphicsEvent event={e} timeline={timeline} differentDates={differentDates} gapBetweenDates={gapBetweenDates} options={options}  key={'graphics_event_'+e.event_id}/>
            )
        })} */}
        {ownDifferentesDates.map((d: DreamerDate) => {
          const eventsList = events.filter((e: Events) => e.event_date.isEqual(d))
          if(eventsList.length > 1) {
            return (
              <EventsGroup eventsList={eventsList} timeline={timeline} differentDates={differentDates} gapBetweenDates={gapBetweenDates} options={options}  key={'events_group_'+eventsList[0].event_id}/>
            )
          }
          else {
            return (
              <GraphicsEvent event={eventsList[0]} isInGroup={false} timeline={timeline} differentDates={differentDates} gapBetweenDates={gapBetweenDates} options={options}  key={'graphics_event_'+eventsList[0].event_id}/>
            )
          }
        })}
      </div>
    </React.Fragment>
  )
}

export default GraphicsTimeline;