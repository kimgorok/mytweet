import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/server/db";
import withHandler, { ResponseType } from "../../../lib/server/withHandler";

interface CreateTweetRequestBody {
  tweet: string;
  user: {
    connect: {
      id: any;
    };
  };
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const tweets = await db.tweet.findMany({
      include: {
        _count: {
          select: {
            favs: true,
          },
        },
      },
    });
    res.json({
      ok: true,
      tweets,
    });
  }
  if (req.method === "POST") {
    const { tweet, user }: CreateTweetRequestBody = req.body;
    const tweets = await db.tweet.create({
      data: {
        tweet,
        user: {
          connect: {
            id: user?.connect.id, // 'id' 속성 추가
          },
        },
      },
    });
    res.json({
      ok: true,
      tweets,
    });
  }
}

export default withHandler({
  methods: ["GET", "POST"],
  handler,
});
