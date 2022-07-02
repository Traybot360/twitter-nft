// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { NFTStorage, File, Blob } from "nft.storage";

type Data = {
  name?: string;
  description?: string;
  image?: File;
  error?: String;
};

const client = new NFTStorage({ token: process.env.STORAGE_API_KEY || "" });

async function getExampleImage(base64: string) {
  const r = await fetch(base64);
  if (!r.ok) {
    throw new Error(`error fetching image: [${r.statusCode}]: ${r.status}`);
  }
  return r.blob();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(405).send({ error: "Only POST requests allowed" });
    return;
  }
  // const body = JSON.parse(req.body)
  if (req.body.base64 == "undefined") {
    res.status(500).json({ error: "No image found" });
    return;
  }
  const base64 = req.query.base64;
  Blob;
  // const blob = new Blob([base64]);
  // const imageFile = new File([base64], "nft.png", {
  //   type: "image/png",
  // });
  // const image = await getExampleImage(base64);
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const image = new File([byteArray], "nft.png", { type: "image/png" });
  const imageRes = await client.storeDirectory([image]);
  // const metadata = await client.store({
  //   name: "My sweet NFT",
  //   description: "Just try to funge it. You can't do it.",
  //   // image: imageFile,
  //   image,
  // });
  // res.status(200).json({ metadata });
  res.status(200).json({ imageRes });
}
