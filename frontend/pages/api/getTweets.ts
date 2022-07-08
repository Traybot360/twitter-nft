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

const config = (ids: string | string[] | undefined): configType => ({
  method: "get",
  url: `https://api.twitter.com/2/tweets?tweet.fields=public_metrics&ids=${ids}`,
  headers: {
    Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.query.tweets == "undefined") {
    res.status(500).json({ error: "No tweets defined" });
    return;
  }
  //   if the authorId is defined, we can get the user's name and profile image
  const tweets = req.query.tweets;
  try {
    let api_res = await axios(config(tweets));
    res.status(200).json(api_res.data);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
