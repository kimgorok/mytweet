import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../lib/server/db";
import withHandler from "../../../../lib/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    session: { user },
  } = req;

  // db에서 tweet 가져오기
  const tweet = await db.tweet.findUnique({
    where: {
      id: Number(id),
    },

    // user에서 id랑 name을 가져오도록 요청
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const isLiked = Boolean(
    await db.fav.findFirst({
      where: {
        tweetId: tweet?.id,
        userId: user?.id,
      },
      // fav필드의 id 가져오기
      select: {
        id: true,
      },
    })
  );

  res.json({
    ok: true,
    tweet,
    isLiked,
  });
}

export default withHandler({
  methods: ["GET"],
  handler,
});
