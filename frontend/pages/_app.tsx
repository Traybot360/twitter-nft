import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const desiredChainId = ChainId.Goerli;
  return (
    <ThirdwebProvider desiredChainId={desiredChainId}>
      <ChakraProvider>
        <Head>
          <title>Twitter NFT Generator</title>
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
