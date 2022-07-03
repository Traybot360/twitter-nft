import {
  Button,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ConnectWallet from "./ConntectWallet";
import useContract from "../hooks/useContract";
import DisplayNFTs from "./DisplayNFTs";

const Landing = () => {
  const address = useAddress();

  const [quoteId, setQuoteId] = useState("");

  const router = useRouter();

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
    >
      <GridItem colStart={2} rowStart={3} h="10" bg="white">
        <Heading as="h2" size="2xl" textAlign="center">
          Own Your Thoughts
        </Heading>
      </GridItem>
      <GridItem colStart={2} rowStart={4} h="10" bg="white">
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
      </GridItem>
      <GridItem colStart={2} rowStart={6}>
        <ConnectWallet />
        {address
          ? `welcome ${address}`
          : "Please connect metamask to view owned tweets."}
        <DisplayNFTs />
      </GridItem>
    </Grid>
  );
};

export default Landing;
