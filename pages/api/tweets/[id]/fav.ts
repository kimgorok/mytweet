import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../lib/server/db";
import { withApiSession } from "../../../../lib/server/withSession";
import withHandler from "../../../../lib/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    session: { user },
  } = req;

  const alreadyExists = await db.fav.findFirst({
    where: {
      tweetId: Number(id),
      userId: user?.id,
    },
  });
  // fav가 이미 있다면 삭제 (좋아요 취소)
  if (alreadyExists) {
    await db?.fav.delete({
      where: {
        id: alreadyExists.id,
      },
    });
    // (좋아요 누르기)
  } else {
    await db.fav.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        tweet: {
          // tweet과 연결
          connect: {
            // id는 url에 있는 id가 됨
            id: Number(id),
          },
        },
      },
    });
  }
  res.json({
    ok: true,
  });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
