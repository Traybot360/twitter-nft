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

const config = (userId: string | string[] | undefined): configType => ({
  method: "get",
  url: `https://api.twitter.com/2/users/${userId}?user.fields=username,profile_image_url`,
  headers: {
    Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.query.authorId == "undefined") {
    res.status(500).json({ error: "No user defined" });
    return;
  }
  //   if the authorId is defined, we can get the user's name and profile image
  const authorId = req.query.authorId;
  try {
    let api_res = await axios(config(authorId));
    res.status(200).json(api_res.data);
  } catch {
    res.status(500).json({ error: "Something went wrong :(" });
  }
}
