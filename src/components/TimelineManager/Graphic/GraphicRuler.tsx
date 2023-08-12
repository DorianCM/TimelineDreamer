import DreamerDate from '../../../models/DreamerDate';
import { GraphicOptions } from '../../common/GraphicOptions';

interface typeProps {
  height: number;
  differentDates: DreamerDate[];
  gapBetweenDates: number;
  options: GraphicOptions;
}

function GraphicsRuler(props: typeProps) {
  const { height, differentDates, gapBetweenDates, options } = props;
  
  const sizeMark = 10;

  return (
    <div style={{width: '1000px', height: options.sizeRuler, left: options.paddingArea, top:height-2*options.paddingArea, backgroundColor: 'yellow', position:'absolute'}}>
      {differentDates.map(date => {
        const left = -(sizeMark/2) +  gapBetweenDates * differentDates.findIndex(d => d.isEqual(date));

        return (
          <div style={{left: left, top: -5, height: options.sizeRuler+10, width: sizeMark, backgroundColor: 'black', position: 'absolute', zIndex: 20}}  key={date.toString()}>
            <p style={{top: options.sizeRuler+10, position: 'absolute', zIndex: 20}}>{date.toString()}</p>
          </div>
        )
      })}
    </div>
  )
}

export default GraphicsRuler;