import { NFTStorage } from "nft.storage";

export async function base64ToBlob(imgUrl: string) {
  const r = await fetch(imgUrl);
  if (!r.ok) {
    throw new Error(`error fetching image: [${r.statusCode}]: ${r.status}`);
  }
  return r.blob();
}

const mintNFT = async (blobImg: Blob) => {
  const client = new NFTStorage({ token: process.env.NFTStorage_KEY || "" });
  const metadata = await client.store({
    name: "NFT tester!",
    description: "Just a random test NFT",
    image: blobImg,
  });
  console.log({ metadata });
  return metadata;
};

export default mintNFT;
