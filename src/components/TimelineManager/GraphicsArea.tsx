import React, {useState, useRef, useEffect} from 'react';

function GraphicsArea(props: any) {
  let ref = useRef(null);
  const [isScrolling, setIsScrolling] = useState<boolean>(false)
  const [clientX, setClientX] = useState<number>(0)
  const [scrollX, setScrollX] = useState<number>(0)
  const [previousScrollLeft, setPreviousScrollLeft] = useState<number>(0)
  const [clientY, setClientY] = useState<number>(0)
  const [scrollY, setScrollY] = useState<number>(0)
  const [previousScrollTop, setPreviousScrollTop] = useState<number>(0)

  const [height, setHeight] = useState<number>(1);

  const handleResize = () => {
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    handleResize(); // The first time
  })

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
    if(scrollX < 0) { //To avoid being in the negative and to have to scroll in the void
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
      
      if(previousScrollLeft === scrollLeft) {
        setScrollX(previousScrollLeft);
      }
      if(previousScrollTop === scrollTop) {
        setScrollY(previousScrollTop);
      }
      setPreviousScrollLeft(scrollLeft);
      setPreviousScrollTop(scrollTop);
    }
  };


  return (
    <div ref={ref} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove} onMouseLeave={() => setIsScrolling(false)}
    style={{width: '100%', height: height+"px", backgroundColor: 'blue', overflow:'auto'}} className='toGrab'>
      <div style={{width: '5000px', height: '750px'/*, overflow:'hidden'*/}}>

      </div>
    </div>
  )
}

export default GraphicsArea;