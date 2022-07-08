import { Grid, GridItem } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import useContract from "../hooks/useContract";
import Nft from "./Nft";

// a grid displaying the owned NFT's of the current user
const DisplayNFTs = ({ setLoading }: { setLoading: Function }) => {
  const address = useAddress();
  const contractPromise = useContract();

  const [contract, setContract] = useState(null);
  const [metaUrl, setMetaUrl] = useState([]);
  const [metadata, setMetadata] = useState([]);

  useEffect(() => {
    if (!address) {
      setMetaUrl([]);
      setMetadata([]);
    }
  }, [address]);

  useEffect(() => {
    /*
    since the hook returns a promise for the contract, 
    wait for it to resolve to set the contract in state
    */
    if (contractPromise) {
      contractPromise.then((c) => setContract(c));
    }
  }, [contractPromise]);

  useEffect(() => {
    (async () => {
      // if the contract is set, get all owned tokens
      if (address && contract) {
        setLoading(true);
        let tokenAmount = await contract.methods.balanceOf(address).call();
        tokenAmount = parseInt(tokenAmount);
        let ownedIds = [];
        // loop and get the ids of the tokens they own
        for (let i = 0; i < tokenAmount; i++) {
          ownedIds.push(
            await contract.methods.tokenOfOwnerByIndex(address, i).call()
          );
        }
        // loop and get the metadata of the tokens they own
        for (const i of ownedIds) {
          setMetaUrl([...metaUrl, await contract.methods.tokenURI(i).call()]);
        }
      }
    })();
  }, [address, contract]);

  useEffect(() => {
    // for every metadata url, resolve get the metadata
    for (const i of metaUrl) {
      fetch(`https://ipfs.io/ipfs/${i}`)
        .then((res) => res.json())
        .then((data) => setMetadata([...metadata, data]));
    }
    setLoading(false);
  }, [metaUrl]);

  return (
    <Grid
      placeContent="center"
      placeItems="center"
      gap={4}
      rowGap={50}
      templateColumns="repeat( auto-fit, 450px )"
    >
      {metadata.map((metadata, i) => (
        <GridItem key={i}>
          <Nft {...metadata} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default DisplayNFTs;
