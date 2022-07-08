import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";

type CanvasSliderTypes = {
  startValue: number;
  middleValue: number;
  endValue: number;
  units?: string;
  sliderValue: number;
  setSliderValue: Function;
};

// slider component for the canvas values
const CanvasSlider = ({
  startValue,
  middleValue,
  endValue,
  units,
  sliderValue,
  setSliderValue,
}: CanvasSliderTypes) => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <Slider
      id="slider"
      min={startValue}
      max={endValue}
      onChange={(v) => setSliderValue(v)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      defaultValue={sliderValue}
    >
      <SliderMark value={startValue} mt="1" ml="-2.5" fontSize="sm">
        {startValue}
      </SliderMark>
      <SliderMark value={middleValue} mt="1" ml="-2.5" fontSize="sm">
        {middleValue}
      </SliderMark>
      <SliderMark value={endValue} mt="1" ml="-2.5" fontSize="sm">
        {endValue}
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <Tooltip
        hasArrow
        bg="teal.500"
        color="white"
        placement="top"
        isOpen={showTooltip}
        // TODO: round the value to the nearest whole number
        label={`${Math.round((sliderValue / endValue) * endValue)}${units}`}
      >
        <SliderThumb />
      </Tooltip>
    </Slider>
  );
};

export default CanvasSlider;
