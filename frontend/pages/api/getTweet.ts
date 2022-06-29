// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  name?: string;
  error?: string;
};

type configType = {
  method: string;
  url: string;
  headers: {
    Authorization: string;
  };
};

const config = (tweetId: string | string[] | undefined): configType => ({
  method: "get",
  url: `https://api.twitter.com/2/tweets/${tweetId}?tweet.fields=author_id,created_at`,
  headers: {
    Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.query.tweetId == "undefined") {
    res.status(500).json({ error: "No user defined" });
    return;
  }
  //   if the userId is defined, we can get the user's name and profile image
  const tweetId = req.query.tweetId;
  try {
    let api_res = await axios(config(tweetId));
    res.status(200).json(api_res.data);
  } catch {
    res.status(500).json({ error: "Something went wrong :(" });
  }
}
