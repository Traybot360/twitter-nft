import {
  Button,
  Center,
  Grid,
  GridItem,
  useDisclosure,
} from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { useEffect, useRef, useState } from "react";
import ConnectWallet from "../components/ConntectWallet";
import LoadingModal from "../components/QuotePage/LoadingModal";

import Options from "../components/QuotePage/Options";
import useOptions from "../components/QuotePage/useOptions";
import TwitterCard from "../components/QuotePage/TwitterCard";
import useContract from "../hooks/useContract";
import uploadNFT, { base64ToBlob } from "../utils/NFTStorage";
import { useRouter } from "next/router";

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
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const address = useAddress();

  const canvasRef = useRef(null);
  const contractPromise = useContract();

  const [contract, setContract] = useState(null);
  const [message, setMessage] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (contractPromise) {
      contractPromise.then((c) => setContract(c));
    }
  }, [contractPromise]);

  const handleClick = async () => {
    setLoading(true);
    setMessage("Loading...");
    onOpen();
    if (canvasRef?.current) {
      const canvas = canvasRef.current;
      const image = await canvas.toDataURL("image/png");
      const blob = await base64ToBlob(image);
      // uplaod the metadata to nft.storage
      const metadata = await uploadNFT(
        blob,
        tweetData.id,
        tweetData.created_at
      );
      if (metadata?.url) {
        // remove the ipfs:// prefix
        const url = metadata.url.substring(7, metadata.url.length);
        if (address && contract) {
          try {
            const mintTx = await contract.methods
              .mint(url)
              .send({ from: address });
            console.log({ mintTx });
            if (mintTx.status === true) {
              setMessage("success!");
            }
          } catch (err) {
            // if it failed, then tell the user
            setMessage(
              "Something went wrong when processing the transaction :("
            );
            setLoading(false);
          }
        }
      } else {
        // if not uploaded, then tell the user
        setMessage("Something went wrong when uploading the image :(");
        setLoading(false);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <LoadingModal
        isOpen={isOpen}
        onClose={onClose}
        loading={loading}
        message={message}
        setMessage={setMessage}
      />
      <Grid
        templateColumns="repeat(3, 1fr)"
        templateRows="repeat(10,1fr)"
        gap={4}
        h="100vh"
        p={4}
      >
        <GridItem alignSelf="end" justifySelf="end" colStart={3} rowStart={1}>
          <ConnectWallet />
        </GridItem>
        {/* twitter quote canvas container */}
        <GridItem colStart={1} colSpan={3} rowStart={2} rowEnd={4} h="300">
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
              canvasRef={canvasRef}
            />
          </Center>
        </GridItem>
        <GridItem colStart={1} colSpan={3} rowStart={5} placeSelf="center">
          <Button
            disabled={loading || !address}
            onClick={() => router.push("/")}
            mr={2}
          >
            Go home
          </Button>
          <Button
            colorScheme="purple"
            disabled={loading || !address}
            onClick={handleClick}
            ml={2}
          >
            Mint NFT
          </Button>
        </GridItem>
        {/* sub grid that dynamically places the sliders/radios */}
        <Options values={values} setValues={setValues} />
      </Grid>
    </>
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
