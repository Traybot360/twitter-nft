import { Button, Tooltip } from "@chakra-ui/react";
import { useMetamask, useAddress, useDisconnect } from "@thirdweb-dev/react";

// button for connecting and disconnecting from metamask
const ConnectWallet = () => {
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  const address = useAddress();
  // If a wallet is connected, show address, chainId and disconnect button
  if (address) {
    return (
      <Tooltip label="Disconnect" aria-label="Disconnect">
        <Button colorScheme="purple" onClick={disconnectWallet}>
          {address.substring(0, 9)}...
        </Button>
      </Tooltip>
    );
  }
  // If no wallet is connected, show connect wallet options
  return (
    <Button colorScheme="purple" onClick={() => connectWithMetamask()}>
      Connect MetaMask
    </Button>
  );
};

export default ConnectWallet;
