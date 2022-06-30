import { Center, Grid, GridItem } from "@chakra-ui/react";

import Options from "../components/QuotePage/Options";
import useOptions from "../components/QuotePage/useOptions";
import TwitterCard from "../components/TwitterCard";

type propTypes = {
  tweetData: {
    id: string;
    text: string;
    created_at: string;
    author_id: string;
  };
  authorData: {
    id: string;
    name?: string;
    username: string;
  };
};

// the default values of the slides, was included to make the slider work
const defaultValues = {
  lineSpacing: 50,
  fontSize: 25,
  startPos: 150,
  hAlign: 150,
  textAlign: "center",
};

// generates a quote
const Quote = ({ tweetData, authorData }: propTypes) => {
  const [values, setValues] = useOptions(defaultValues);

  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      templateRows="repeat(10,1fr)"
      gap={4}
      h="100vh"
    >
      {/* twitter quote canvas container */}
      <GridItem colStart={2} rowStart={2} rowEnd={4} h="300">
        <Center>
          <TwitterCard
            quote={tweetData.text}
            username={authorData.username}
            fullname={authorData.name}
            lineSpacing={values.lineSpacing}
            startPos={values.startPos}
            fontSize={values.fontSize}
            hAlign={values.hAlign}
            textAlign={values.textAlign}
          />
        </Center>
      </GridItem>
      {/* sub grid that dynamically places the sliders/radios */}
      <Options values={values} setValues={setValues} />
    </Grid>
  );
};

export default Quote;

// This gets called on every request
export async function getServerSideProps({ query }: any) {
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
