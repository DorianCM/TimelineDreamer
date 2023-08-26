import React from 'react';
import Timeline from '../../../models/Timeline';
import Events from '../../../models/Events';
import Merge from '../../../models/Merge';
import DreamerDate from '../../../models/DreamerDate';
import { GraphicOptions } from '../../common/GraphicOptions';
import PartTimeline from './PartTimeline';

interface typeProps {
  timeline: Timeline;
  timelines: Timeline[];
  events: Events[];
  merges: Merge[];
  differentDates: DreamerDate[];
  heightScreen: number
  gapBetweenDates: number;
  options: GraphicOptions;
}

interface part {
  start: DreamerDate;
  end: DreamerDate;
  orderPosition: number;
  isOnSameLine: boolean;
  isMerging: boolean;
  previousOrder: number;
}

function GraphicsTimeline(props: typeProps) {
  const { timeline, timelines, events, merges, differentDates, heightScreen, gapBetweenDates, options } = props;

  const getTimelineEvents = (events: Events[], part: part): Events[] => {
    let timelineEvents: Events[] = []
    timelineEvents = timelineEvents.concat(events.filter((e: Events) => e.timeline_id === timeline.timeline_id));

    merges.filter((m: Merge) => timeline.timeline_id === m.timeline_base_id).forEach((m: Merge) => {
      console.log("timeline");
      console.log(timeline.timeline_id);
      console.log(events.filter((e: Events) => e.timeline_id === m.timeline_merging_id));



      timelineEvents = timelineEvents.concat(events.filter((e: Events) => e.timeline_id === m.timeline_merging_id));
      //TODO call recursive merge
    })
    
    return timelineEvents.filter((e: Events) => e.event_date.isBetween(part.start, part.end));
    //return timelineEvents;
  }

  const getTimelineOrder = (merge: Merge, timelines: Timeline[]): number => {
    let order = 0;
    if(merge.is_merging) {
      const t = timelines.find((t) => t.timeline_id === merge.timeline_base_id);
      console.log(t)
      if(t !== undefined) order = t.timeline_order;
    }
    else {
      order = timeline.timeline_id;
    }
    return order;
  }

  const partsList: part[] = [];
  const ownMerges = merges.filter((m: Merge) => m.timeline_merging_id === timeline.timeline_id)
  if(ownMerges.length === 0) {
    const onlyPart = {start: timeline.timeline_start, end: timeline.timeline_end, orderPosition: timeline.timeline_order, isOnSameLine: true, isMerging: false, previousOrder: 0}
    partsList.push(onlyPart);
  }
  else {
    // const firstMerge = merges.sort((a, b) => DreamerDate.compareDate(a.merge_date, b.merge_date))[0];
    // const lastMerge = merges[merges.length-1];
    // console.log(firstMerge);
    // console.log(lastMerge);
    
    // // First part
    // if(timeline.timeline_start.isEqual(firstMerge.merge_date)) {
    //   const partStart = {start: timeline.timeline_start, end: firstMerge.merge_date, orderPosition: getTimelineOrder(firstMerge, timelines), isOnSameLine: false, isMerging: true};
    //   partsList.push(partStart);
    // }
    // let partStart = {start: timeline.timeline_start, end: firstMerge.merge_date, orderPosition: timeline.timeline_order, isOnSameLine: true, isMerging: true}
    // partsList.push(partStart)

    // let partEnd = {start: lastMerge.merge_date, end: timeline.timeline_end, orderPosition: getTimelineOrder(lastMerge, timelines), isOnSameLine: !lastMerge.is_merging, isMerging: lastMerge.is_merging}
    // partsList.push(partEnd)
    ownMerges.sort((a, b) => DreamerDate.compareDate(a.merge_date, b.merge_date));

    let previousPart: part;
    ownMerges.forEach((m: Merge, i: number) => {
      console.log(m.merge_date);
      console.log("i");
      console.log(i);
      
      const nextDate = i+1 === ownMerges.length ? timeline.timeline_end : ownMerges[i+1].merge_date;

      let currentPart: part;
      if(i === 0 && m.merge_date.isEqual(timeline.timeline_start)) {
        currentPart = {start: timeline.timeline_start, end: nextDate, orderPosition: getTimelineOrder(m, timelines), isOnSameLine: false, isMerging: true, previousOrder: 0};
      }
      else if(i === 0) {
        let firstPart = {start: timeline.timeline_start, end: m.merge_date, orderPosition: timeline.timeline_order, isOnSameLine: true, isMerging: false, previousOrder: 0};
        partsList.push(firstPart);
        currentPart = {start: m.merge_date, end: nextDate, orderPosition: getTimelineOrder(m, timelines), isOnSameLine: false, isMerging: true, previousOrder: timeline.timeline_order};
      }
      else {
        currentPart = {start: m.merge_date, end: nextDate, orderPosition: getTimelineOrder(m, timelines), isOnSameLine: !previousPart.isOnSameLine, isMerging: m.is_merging, previousOrder: previousPart.orderPosition};
      }

      partsList.push(currentPart);
      previousPart = currentPart;
    });
  }
  
  //TODO verify that the base timeline can contains events : warning that the following events will not show on the base timeline
  //TODO verify when changing timeline dates if events AND merges are still between
  //TODO event on the merge date are at two different places : is it a problem ?

  return (
    <React.Fragment>
        {partsList.map((p: part, i: number) => {
          return (
            <PartTimeline timeline={timeline} timelines={timelines}
              events={getTimelineEvents(events, p)}
              differentDates={differentDates}
              heightScreen={heightScreen}
              gapBetweenDates={gapBetweenDates}
              options={options}
              specifics={p}
              key={'part_timeline'+timeline.timeline_id+'_'+i}/>
          )
        })}
    </React.Fragment>
  )
}

export default GraphicsTimeline;