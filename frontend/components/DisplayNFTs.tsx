import { useAddress } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import useContract from "../hooks/useContract";
import Nft from "./Nft";

const DisplayNFTs = () => {
  const address = useAddress();
  const contractPromise = useContract();

  const [contract, setContract] = useState(null);
  const [metaUrl, setMetaUrl] = useState([]);
  const [metadata, setMetadata] = useState([]);

  useEffect(() => {
    if (contractPromise) {
      contractPromise.then((c) => setContract(c));
    }
  }, [contractPromise]);

  useEffect(() => {
    (async () => {
      if (address && contract) {
        let tokenAmount = await contract.methods.balanceOf(address).call();
        console.log({ tokenAmount });
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
    for (const i of metaUrl) {
      fetch(`https://ipfs.io/ipfs/${i}`)
        .then((res) => res.json())
        .then((data) => setMetadata([...metadata, data]));
    }
  }, [metaUrl]);

  useEffect(() => {
    console.log({ metaUrl });
  }, [metaUrl]);

  return metadata.map((metadata, i) => <Nft key={i} {...metadata} />);
};

export default DisplayNFTs;
