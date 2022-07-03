import detectEthereumProvider from "@metamask/detect-provider";
import { useAddress } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import Web3 from "web3";

import TweetNFT from "../../hardhat/artifacts/contracts/TweetNFT.sol/TweetNFT.json";

const useContract = async () => {
  const address = useAddress();

  const [contract, setContract] = useState(null);

  useEffect(() => {
    // if the wallet is connected and the provider is loaded, load the contract
    (async () => {
      const provider = await detectEthereumProvider();
      if (address && provider) {
        const web3 = new Web3(provider);
        const contract = new web3.eth.Contract(
          TweetNFT.abi,
          process.env.GOERLI_ADDRESS
        );
        setContract(contract);
      }
    })();
  }, [address]);

  useEffect(() => console.log({ contract }), [contract]);

  return contract;
};

export default useContract;
