import {
  Center,
  Grid,
  GridItem,
  Heading,
  HStack,
  useRadioGroup,
} from "@chakra-ui/react";
import { useState } from "react";

import CanvasSlider from "../components/CanvasSlider";
import RadioCard from "../components/RadioCard";
import TwitterCard from "../components/TwitterCard";

// generates a quote
const Quote = ({ tweetData, authorData }) => {
  // the default values of the slides, was included to make the slider work
  // TODO: remove all default value
  const defaultValues = {
    lineSpacing: 50,
    fontSize: 25,
    startPos: 150,
    hAlign: 150,
  };

  const [lineSpacing, setLineSpacing] = useState(defaultValues.lineSpacing);
  const [startPos, setStartPos] = useState(defaultValues.startPos);
  const [fontSize, setFontSize] = useState(defaultValues.fontSize);
  // horizontal alignment start position
  const [hAlign, setHAlign] = useState(defaultValues.hAlign);
  const [textAlign, setTextAlign] = useState("center");

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "center",
    defaultValue: "center",
    onChange: (value) => setTextAlign(value),
  });

  const group = getRootProps();

  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      templateRows="repeat(10,1fr)"
      gap={4}
      h="100vh"
    >
      {console.log({ tweetData, authorData })}
      {/* twitter quote canvas container */}
      <GridItem colStart={2} rowStart={2} rowEnd={4} h="300">
        <Center>
          <TwitterCard
            quote={tweetData.text}
            username={authorData.username}
            fullname={authorData.name}
            lineSpacing={lineSpacing}
            startPos={startPos}
            fontSize={fontSize}
            hAlign={hAlign}
            textAlign={textAlign}
          />
        </Center>
      </GridItem>
      {/* sub container that dynamically places the sliders/radios */}
      <GridItem m={2} colStart={1} colSpan={3} rowStart={5}>
        <Grid
          justifyContent="center"
          alignContent="center"
          gap={4}
          templateColumns="repeat( auto-fit, minmax(250px, 1fr) )"
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
              sliderValue={lineSpacing}
              setSliderValue={setLineSpacing}
              defaultValue={defaultValues.lineSpacing}
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
              sliderValue={startPos}
              setSliderValue={setStartPos}
              defaultValue={defaultValues.startPos}
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
              sliderValue={fontSize}
              setSliderValue={setFontSize}
              defaultValue={defaultValues.fontSize}
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
              sliderValue={hAlign}
              setSliderValue={setHAlign}
              defaultValue={defaultValues.hAlign}
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
    </Grid>
  );
};

export default Quote;

// This gets called on every request
export async function getServerSideProps({ query }) {
  // get the tweet id from the url
  const tweetId = query.id;
  // Fetch data from external API
  const tweetRes = await fetch(
    `http://localhost:3000/api/getTweet?tweetId=${tweetId}`
  );
  let tweetData = await tweetRes.json();
  tweetData = tweetData?.data;
  if (!tweetData || tweetData.error) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  const authorRes = await fetch(
    `http://localhost:3000/api/getAuthor?authorId=${tweetData.author_id}`
  );
  let authorData = await authorRes.json();
  authorData = authorData?.data;
  if (!authorData || authorData.error) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  // Pass data to the page via props
  return { props: { tweetData, authorData } };
}
