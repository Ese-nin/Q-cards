import * as React from 'react';
import Slider, {SliderProps} from '@mui/material/Slider';


export const RangeSlider: React.FC<SliderProps> = (props) => {

    return (
            <Slider
                {...props}
            />
    );
}