import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/server/db";
import { withApiSession } from "../../../lib/server/withSession";
import withHandler from "../../../lib/server/withHandler";

interface LoginRequestData {
  userName: string; // 사용자 이름 필드 추가
  phoneNum: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userName, phoneNum } = req.body; // 사용자 이름 캐스팅

  const foundUser = await db.user.findUnique({
    where: {
      phoneNum,
    },
  });

  // 계정이 존재하지 않을 경우 로그인 거부
  if (!foundUser) {
    return res.status(404).end();
  }

  // 사용자 이름을 확인하여 계정이 일치할 경우 로그인 성공
  if (foundUser.name === userName) {
    req.session.user = {
      id: foundUser.id,
    };
    await req.session.save();
    return res.json({ ok: true });
  }

  // 사용자 이름이 일치하지 않을 경우 로그인 거부
  return res.status(403).json({ ok: false, error: "Login failed" });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
    isPrivate: false,
  })
);
