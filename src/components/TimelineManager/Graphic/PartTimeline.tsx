import React from 'react';
import Timeline from '../../../models/Timeline';
import Events from '../../../models/Events';
import DreamerDate from '../../../models/DreamerDate';
import { GraphicOptions } from '../../common/GraphicOptions';
import GraphicsEvent from './GraphicsEvent';
import EventsGroup from './EventsGroup';

interface typeProps {
  timeline: Timeline;
  timelines: Timeline[];
  events: Events[];
  differentDates: DreamerDate[];
  heightScreen: number
  gapBetweenDates: number;
  options: GraphicOptions;
  specifics: part
}

interface part {
  start: DreamerDate;
  end: DreamerDate;
  orderPosition: number;
  isOnSameLine: boolean;
  isMerging: boolean;
  previousOrder: number;
}

function PartTimeline(props: typeProps) {
  const { timeline, timelines, events, differentDates, heightScreen, gapBetweenDates, options, specifics } = props;

  const getVerticalPosition = (order: number): number => {
    const nbTimelines = timelines.length;
    const isEven = nbTimelines % 2 === 0;
    const nbFromCenter = isEven ? nbTimelines/2 : (nbTimelines-1)/2; // Exemple : if 5 timelines, the middle one is the third (from 0, it is the number 2)
    let nbOrder = (nbFromCenter-order-1); // Minus 1 because order of timeline begin at one
    if(isEven && nbOrder <= 0) // Because the middle must be empty, if even
      nbOrder--;
    return heightScreen*0.65+options.gapBetweenTimeline*nbOrder;
  }
  // For portions (delimited by merge date), and background color only if same level
  const verticalPosition: number = getVerticalPosition(timeline.timeline_order);
  const width = gapBetweenDates * (differentDates.findIndex(d => d.isEqual(specifics.end)) - differentDates.findIndex(d => d.isEqual(specifics.start)));
  const left = options.paddingArea + gapBetweenDates * differentDates.findIndex(d => d.isEqual(specifics.start));

  const ownDifferentesDates = differentDates.filter((d: DreamerDate) => events.some(e => e.event_date.isEqual(d)));

  const listInputDate: DreamerDate[] = differentDates.filter((d: DreamerDate) => d.isBetween(specifics.start, specifics.end) && specifics.isOnSameLine)
  
  //if date not on the same level, don't add the date zone button
  //Faire un connard de rectangle
  return (
    <React.Fragment>
      {specifics.isOnSameLine ? (
        <div style={{
          width: width, 
          height: options.sizeTimeline,
          backgroundColor: 'red', 
          top: verticalPosition, 
          left: left, position: 'absolute'}}>

          {timeline.timeline_id +" "+ timeline.timeline_order +" "+ timeline.timeline_title}

          {listInputDate.map((d: DreamerDate) => {
            const s = 10
            const left = -(s/2) + gapBetweenDates * (differentDates.findIndex(date => date.isEqual(d)) - differentDates.findIndex(date => date.isEqual(specifics.start)));

            return (
              <div style={{backgroundColor: 'black', left: left, height: options.sizeTimeline, width: 10, display: 'inline-block', position: 'absolute', zIndex: 2}} key={'date_input'+d.toString()+'_'+timeline.timeline_id}></div>
            )
          })}

          {ownDifferentesDates.map((d: DreamerDate) => {
            const eventsList = events.filter((e: Events) => e.event_date.isEqual(d))
            if(eventsList.length > 1) {
              return (
                <EventsGroup eventsList={eventsList} timeline={timeline} differentDates={differentDates} gapBetweenDates={gapBetweenDates} options={options} key={'events_group_'+eventsList[0].event_id}/>
              )
            }
            else {
              return (
                <GraphicsEvent event={eventsList[0]} isInGroup={false} timeline={timeline} differentDates={differentDates} gapBetweenDates={gapBetweenDates} options={options}  key={'graphics_event_'+eventsList[0].event_id}/>
              )
            }
          })}
        </div>
    ) : (
      <React.Fragment/>
    ) }

    {specifics.previousOrder > 0 ? (
      <div style={{
        top: getVerticalPosition(specifics.orderPosition),
        left: left-5,
        width: 10,
        height: Math.abs(getVerticalPosition(specifics.orderPosition) - getVerticalPosition(specifics.previousOrder)),
        backgroundColor: 'aqua',
        zIndex: 1, position: 'absolute'
      }}/>
    ) : (
      <React.Fragment/>
    ) }
    
    </React.Fragment>
  )
}

export default PartTimeline;