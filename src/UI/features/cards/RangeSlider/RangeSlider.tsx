import * as React from 'react';
import Slider from '@mui/material/Slider';
import s from './RangeSlider.module.css'

function valuetext(value: number) {
    return `${value}`;
}

type RangeSliderPropsType = {

}

export const RangeSlider: React.FC<RangeSliderPropsType> = () => {
    const [value, setValue] = React.useState<number[]>([10, 90]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    return (
        <div className={s.slider}>
            <Slider
                getAriaLabel={() => 'Value of pack'}
                value={value}
                min={0} // придёт из запроса за картами
                max={100} // придёт из запроса за картами
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
            />
        </div>
    );
}