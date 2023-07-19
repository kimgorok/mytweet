import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/server/db";
import withHandler from "../../../lib/server/withHandler";
import { User } from "@prisma/client";

interface CreateAccountRequestData {
  userName: string; // 수정: userName을 올바르게 지정
  phoneNum: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userName, phoneNum } = req.body as CreateAccountRequestData; // 수정: userName을 캐스팅

  const ExistUser = await db.user.findUnique({
    where: {
      phoneNum,
    },
  });

  if (ExistUser) {
    return res.json({ ok: false, error: "존재하는 번호입니다." });
  }

  const user = await db.user.create({
    data: {
      phoneNum,
      name: userName, // 수정: userName 추가
    },
  });

  return res.json({ ok: true });
}

export default withHandler({
  methods: ["POST"],
  handler,
  isPrivate: false,
});
