import React, {useState, useEffect, useRef} from 'react';
import Timeline from '../../../models/Timeline';
import Events from '../../../models/Events';
import Merge from '../../../models/Merge';
import DreamerDate from '../../../models/DreamerDate';
import { GraphicOptions } from '../../common/GraphicOptions';

import GraphicsTimeline from './GraphicsTimeline';
import GraphicsRuler from './GraphicRuler';

interface typeProps {
  timelines: Timeline[];
  events: Events[];
  merges: Merge[];
}

const options: GraphicOptions = {
  paddingArea: 100,
  sizeTimeline: 100,
  sizeEvent: 40,
  sizeRuler: 50,

  gapBetweenTimeline: 150,
  minimumGapBetweenDates: 25,

  minimumWidth: 500,
  minimumHeight: 500
}

function GraphicsArea(props: typeProps) {
  const { timelines, events, merges } = props;

  const [differentDates, setDifferentDates] = useState<DreamerDate[]>([]);

  const isScrolling = useRef<boolean>(false);
  const clientX = useRef<number>(0);
  const scrollX = useRef<number>(0);
  const previousScrollLeft = useRef<number>(0);
  const clientY = useRef<number>(0);
  const scrollY = useRef<number>(0);
  const previousScrollTop = useRef<number>(0);
  const variantY = useRef<number>(0);

  const [heightScreen, setHeightScreen] = useState<number>(1);

  const [gapBetweenDates, setGapBetweenDates] = useState<number>(0);

  const handleResize = () => {
    setHeightScreen(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    handleResize(); // The first time
  })

  useEffect(() => {
    let listOfDates: DreamerDate[] = [];
    timelines.forEach(element => {
      listOfDates.push(element.timeline_start);
      listOfDates.push(element.timeline_end);
    })
    events.forEach(element => {
      listOfDates.push(element.event_date);
    });
    listOfDates.sort((a: DreamerDate, b:DreamerDate) => DreamerDate.compareDate(a, b));

    let uniqueDates: DreamerDate[] = [];
    listOfDates.forEach(element => {
      if(uniqueDates.findIndex(d => d.isEqual(element)) < 0) { // Not already present
        uniqueDates.push(element);
      }
    });
    
    setDifferentDates(uniqueDates);
    setGapBetweenDates(options.minimumWidth / uniqueDates.length < options.minimumGapBetweenDates ? options.minimumGapBetweenDates : options.minimumWidth / uniqueDates.length);
  }, [timelines, events])

  const onMouseDown = (e: React.MouseEvent) => {
    isScrolling.current = true;
    clientX.current = e.clientX;
    clientY.current = e.clientY;
    e.currentTarget.classList.add('grabbing');
    e.currentTarget.classList.remove('toGrab');
  };

  const onMouseUp = (e: React.MouseEvent) => {
    isScrolling.current = false;
    
    e.currentTarget.classList.add('toGrab');
    e.currentTarget.classList.remove('grabbing');
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if(scrollX.current < 0) { //To avoid being in the negative and to have to scroll in the void to come back
      scrollX.current = 0;
    }
    if(scrollY.current < 0) {
      scrollY.current = 0;
    }
    
    if (isScrolling.current) {
      const scrollLeft = e.currentTarget.scrollLeft;
      const newScrollLeft = scrollX.current - e.clientX + clientX.current;
      const scrollTop = e.currentTarget.scrollTop;
      const newScrollTop = scrollY.current - e.clientY + clientY.current;

      e.currentTarget.scrollLeft = newScrollLeft;
      scrollX.current = scrollX.current - e.clientX + clientX.current;
      clientX.current = e.clientX;
      e.currentTarget.scrollTop = newScrollTop;
      scrollY.current = scrollY.current - e.clientY + clientY.current;
      clientY.current = e.clientY;
      
      if(previousScrollLeft.current === scrollLeft) { //To avoid being too high and to have to scroll in the void to come back
        scrollX.current = previousScrollLeft.current;
      }
      if(previousScrollTop.current === scrollTop) {
        scrollY.current = previousScrollTop.current;
      }
      variantY.current = variantY.current+previousScrollTop.current-scrollTop; //TODO Avoid little jump
      previousScrollLeft.current = scrollLeft;
      previousScrollTop.current = scrollTop;
    }
  };

  // const onScroll = (e: React.UIEvent<HTMLElement>): void => {
  //   //e.stopPropagation()
  //   const window = e.currentTarget;

  //   if (scrollY > window.scrollTop) {
  //       console.log("scrolling up");
  //   } else if (scrollY < window.scrollTop) {
  //       console.log("scrolling down");
  //   }
  // }


  const gap = isFinite(gapBetweenDates) ? gapBetweenDates : options.minimumGapBetweenDates;
  const width = differentDates.length*gap+2*options.paddingArea < options.minimumWidth ? options.minimumWidth : differentDates.length*gap+2*options.paddingArea;
  const height = timelines.length*options.gapBetweenTimeline+2*options.paddingArea < options.minimumHeight ? options.minimumHeight : timelines.length*options.gapBetweenTimeline+2*options.paddingArea;

  return (
    <div onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove} onMouseLeave={onMouseUp}
    style={{width: '100%', height: heightScreen, backgroundColor: 'blue', overflow:'hidden'}} className='toGrab'>
      <div style={{width: width, 
                  height: height, position: 'relative'}}>

        {timelines.sort((a: Timeline, b: Timeline) => a.timeline_order < b.timeline_order ? 1 : -1)
        .map((t: Timeline) => {
          return (
            <GraphicsTimeline timeline={t} timelines={timelines}
              events={events.filter((e: Events) => e.event_date.isBetween(t.timeline_start, t.timeline_end))}
              merges={merges}
              differentDates={differentDates}
              heightScreen={heightScreen}
              gapBetweenDates={isFinite(gapBetweenDates) ? gapBetweenDates : options.minimumGapBetweenDates}
              options={options}
              key={'graphics_timeline_'+t.timeline_id}
            />
          )})
        }
        <GraphicsRuler height={heightScreen-variantY.current} differentDates={differentDates} gapBetweenDates={isFinite(gapBetweenDates) ? gapBetweenDates : options.minimumGapBetweenDates} options={options}/>
      </div>
    </div>
  )
}

export default GraphicsArea;