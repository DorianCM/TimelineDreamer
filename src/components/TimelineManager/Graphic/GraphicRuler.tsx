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
    <div style={{width: '1000px', height: options.sizeRuler+'px', left: options.paddingArea+'px', top:height-2*options.paddingArea+'px', backgroundColor: 'yellow', position:'absolute'}}>
      {differentDates.map(date => {
        const left = -(sizeMark/2) +  gapBetweenDates * differentDates.findIndex(d => d.isEqual(date));

        return (
          <div style={{left: left+'px', top: '-5px', height: options.sizeRuler+10+'px', width: sizeMark+'px', backgroundColor: 'black', position: 'absolute', zIndex: 20}}  key={date.toString()}>
            <p style={{top: options.sizeRuler+10+'px', position: 'absolute', zIndex: 20}}>{date.toString()}</p>
          </div>
        )
      })}
    </div>
  )
}

export default GraphicsRuler;