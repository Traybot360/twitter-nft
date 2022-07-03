import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";

function MyApp({ Component, pageProps }: AppProps) {
  const desiredChainId = ChainId.Goerli;
  return (
    <ThirdwebProvider desiredChainId={desiredChainId}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
