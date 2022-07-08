import { Grid, GridItem } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import useContract from "../hooks/useContract";
import Nft from "./Nft";

const DisplayNFTs = ({ setLoading }) => {
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
    if (contractPromise) {
      contractPromise.then((c) => setContract(c));
    }
  }, [contractPromise]);

  useEffect(() => {
    (async () => {
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
    for (const i of metaUrl) {
      fetch(`https://ipfs.io/ipfs/${i}`)
        .then((res) => res.json())
        .then((data) => setMetadata([...metadata, data]));
    }
    setLoading(false);
  }, [metaUrl]);
  // fetch all the tweets information from the twitter api
  // TODO: fetch multiple times if the amount of tweets are > 100
  // useEffect(() => {
  //   if (metaUrl.length > 0 && metadata.length == metaUrl.length) {
  //     let tweets = [];
  //     // TODO: remove duplicates
  //     for (let i = 0; i < metadata.length; i++) {
  //       tweets.push(metadata[i].tweetId);
  //     }
  //     console.log({ tweets });
  //     fetch(`/api/getTweets?tweets=1538865501241327616,1531492116001595393`)
  //       .then((res) => res.json())
  //       .then((res) => {
  //         const data = res.data;
  //         console.log({ dataLength: data.length });
  //         data.forEach((elem) => {
  //           console.log({ elem });
  //           // FIX: this isnt working properly
  // setTweetData({ ...tweetData, [elem.id]: elem });
  //         });
  //       })
  //       .catch((err) => console.error(err));
  //   }
  // }, [metadata, metaUrl]);

  // useEffect(() => console.log({ tweetData }), [tweetData]);

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
