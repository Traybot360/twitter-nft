import { NFTStorage } from "nft.storage";

export async function base64ToBlob(imgUrl: string) {
  const r = await fetch(imgUrl);
  if (!r.ok) {
    throw new Error(`error fetching image: [${r.statusCode}]: ${r.status}`);
  }
  return r.blob();
}

const uplaodNFT = async (blobImg: Blob, tweetId: string, tweetedAt: string) => {
  const client = new NFTStorage({ token: process.env.NFTStorage_KEY || "" });
  const metadata = await client.store({
    name: "TwitterNFT",
    description: "NFT that represents a tweet from Twitter",
    tweetId,
    tweetedAt,
    image: blobImg,
  });
  console.log({ metadata });
  return metadata;
};

export default uplaodNFT;
