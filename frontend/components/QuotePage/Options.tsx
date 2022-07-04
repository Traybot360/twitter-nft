import {
  Grid,
  GridItem,
  Heading,
  HStack,
  useRadioGroup,
} from "@chakra-ui/react";

import CanvasSlider from "./CanvasSlider";
import RadioCard from "./RadioCard";

// settings/options for the canvas containing the quote
const Options = ({
  values,
  setValues,
}: {
  values: any;
  setValues: Function;
}) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "center",
    defaultValue: "center",
    onChange: (value) => setValues("fontSize", value),
  });

  const group = getRootProps();

  return (
    <GridItem m={2} colStart={1} colSpan={3} rowStart={6}>
      <Grid
        justifyContent="center"
        alignContent="center"
        gap={4}
        templateColumns="repeat( auto-fit, 300px )"
      >
        {/* line spacing slider */}
        <GridItem padding={5} h="100">
          <Heading as="h3" size="lg">
            Line spacing
          </Heading>
          <CanvasSlider
            startValue={0}
            middleValue={150}
            endValue={300}
            units="px"
            sliderValue={values.lineSpacing}
            setSliderValue={(val: number) => setValues("lineSpacing", val)}
          />
        </GridItem>
        {/* start position slider */}
        <GridItem padding={5} h="100">
          <Heading as="h3" size="lg">
            Start Position
          </Heading>
          <CanvasSlider
            startValue={0}
            middleValue={150}
            endValue={300}
            units="px"
            sliderValue={values.startPos}
            setSliderValue={(val: number) => setValues("startPos", val)}
          />
        </GridItem>
        {/* font size slider */}
        <GridItem padding={5} h="100">
          <Heading as="h3" size="lg">
            Font Size
          </Heading>
          <CanvasSlider
            startValue={0}
            middleValue={50}
            endValue={100}
            units="px"
            sliderValue={values.fontSize}
            setSliderValue={(val: number) => setValues("fontSize", val)}
          />
        </GridItem>
        {/* horizontal alignment */}
        <GridItem padding={5} h="100">
          <Heading as="h3" size="lg">
            Horizontal start
          </Heading>
          <CanvasSlider
            startValue={0}
            middleValue={150}
            endValue={300}
            units="px"
            sliderValue={values.hAlign}
            setSliderValue={(val: number) => setValues("hAlign", val)}
          />
        </GridItem>
        {/* text align positions */}
        <GridItem padding={5} h="100">
          <Heading as="h3" size="lg" marginBottom={5}>
            Text Align
          </Heading>
          <HStack {...group}>
            {["start", "center", "end"].map((value) => {
              const radio = getRadioProps({ value });
              return (
                <RadioCard key={value} {...radio}>
                  {value}
                </RadioCard>
              );
            })}
          </HStack>
        </GridItem>
      </Grid>
    </GridItem>
  );
};

export default Options;
