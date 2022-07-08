import {
  Button,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useState } from "react";

import ConnectWallet from "./ConntectWallet";
import DisplayNFTs from "./DisplayNFTs";
// landing page "/""
const Landing = () => {
  const address = useAddress();

  const [quoteId, setQuoteId] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  // if quote id is set, redirect to nft generator page
  const handleClick = () => {
    if (quoteId) {
      router.push(`/quote?id=${quoteId}`);
    }
  };

  return (
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
      <GridItem
        placeSelf="center"
        colStart={0}
        colSpan={3}
        rowStart={2}
        rowEnd={3}
        h="10"
        bg="white"
      >
        <Heading as="h2" size="2xl" textAlign="center">
          Own Your Thoughts
        </Heading>
      </GridItem>
      <GridItem
        placeSelf="center"
        minWidth={300}
        colStart={1}
        colSpan={3}
        rowStart={5}
        h="10"
        bg="white"
      >
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            onChange={(e) => setQuoteId(e.target.value)}
            placeholder="Enter your tweet's id"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              Load
            </Button>
          </InputRightElement>
        </InputGroup>
        <Text textAlign="center">Note: Only supported chain is ETH Goerli</Text>
      </GridItem>
      <GridItem colStart={1} colSpan={3} rowStart={7}>
        {loading && <Text textAlign="center">loading...</Text>}
        {address ? (
          <DisplayNFTs setLoading={setLoading} />
        ) : (
          <Text textAlign="center">
            Please connect metamask to view owned tweets.
          </Text>
        )}
      </GridItem>
    </Grid>
  );
};

export default Landing;
