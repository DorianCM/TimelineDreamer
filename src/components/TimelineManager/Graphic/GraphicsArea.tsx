import React, {useState, useEffect} from 'react';
import Timeline from '../../../models/Timeline';
import Events from '../../../models/Events';
import DreamerDate from '../../../models/DreamerDate';
import { GraphicOptions } from '../../common/GraphicOptions';

import GraphicsTimeline from './GraphicsTimeline';
import GraphicsRuler from './GraphicRuler';

interface typeProps {
  timelines: Timeline[];
  events: Events[];
}

const options: GraphicOptions = {
  paddingArea: 100,
  sizeTimeline: 100,
  sizeEvent: 40,
  sizeRuler: 50,

  gapBetweenTimeline: 100,
  minimumGapBetweenDates: 25,

  minimumWidth: 500,
  minimumHeight: 500
}

function GraphicsArea(props: typeProps) {
  const { timelines, events } = props;

  const [differentDates, setDifferentDates] = useState<DreamerDate[]>([]);

  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [clientX, setClientX] = useState<number>(0);
  const [scrollX, setScrollX] = useState<number>(0);
  const [previousScrollLeft, setPreviousScrollLeft] = useState<number>(0);
  const [clientY, setClientY] = useState<number>(0);
  const [scrollY, setScrollY] = useState<number>(0);
  const [previousScrollTop, setPreviousScrollTop] = useState<number>(0);
  const [variantY, setVariantY] = useState<number>(0);

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
    setIsScrolling(true);
    setClientX(e.clientX);
    setClientY(e.clientY);
    e.currentTarget.classList.add('grabbing');
    e.currentTarget.classList.remove('toGrab');
  };

  const onMouseUp = (e: React.MouseEvent) => {
    setIsScrolling(false);
    
    e.currentTarget.classList.add('toGrab');
    e.currentTarget.classList.remove('grabbing');
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if(scrollX < 0) { //To avoid being in the negative and to have to scroll in the void to come back
      setScrollX(0);
    }
    if(scrollY < 0) {
      setScrollY(0);
    }
    
    if (isScrolling) {
      const scrollLeft = e.currentTarget.scrollLeft;
      const newScrollLeft = scrollX - e.clientX + clientX;
      const scrollTop = e.currentTarget.scrollTop;
      const newScrollTop = scrollY - e.clientY + clientY;

      e.currentTarget.scrollLeft = newScrollLeft;
      setScrollX(scrollX - e.clientX + clientX);
      setClientX(e.clientX);
      e.currentTarget.scrollTop = newScrollTop;
      setScrollY(scrollY - e.clientY + clientY);
      setClientY(e.clientY);
      
      if(previousScrollLeft === scrollLeft) { //To avoid being too high and to have to scroll in the void to come back
        setScrollX(previousScrollLeft);
      }
      if(previousScrollTop === scrollTop) {
        setScrollY(previousScrollTop);
      }
      setVariantY(variantY+previousScrollTop-scrollTop); //TODO Avoid little jump
      setPreviousScrollLeft(scrollLeft);
      setPreviousScrollTop(scrollTop);
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
        .map((t: Timeline, index: number) => {
          const nbTimelines = timelines.length;
          const isEven = nbTimelines % 2 === 0
          const nbFromCenter = isEven ? nbTimelines/2 : (nbTimelines-1)/2;
          let nbOrder = (nbFromCenter-index);
          if(isEven && nbOrder <= 0)
            nbOrder--;

          return (
            <GraphicsTimeline timeline={t} events={events.filter((e: Events) => e.timeline_id === t.timeline_id)} differentDates={differentDates} order={nbOrder} heightScreen={heightScreen} gapBetweenDates={gap} options={options}  key={'graphics_timeline_'+t.timeline_id}/>
          )})
        }
        <GraphicsRuler height={heightScreen-variantY} differentDates={differentDates} gapBetweenDates={gap} options={options}/>
      </div>
    </div>
  )
}

export default GraphicsArea;