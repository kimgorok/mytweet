import { Tweet, User } from "@prisma/client";
import useUser from "../../lib/client/useUser";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import useMutation from "../../lib/client/useMutation";
import Layout from "../components/layout";
import Link from "next/link";
import Button from "../components/button";
import { cls } from "../../lib/client/utils";

interface TweetWithUser extends Tweet {
  user: User;
}

interface ItemDetailResponse {
  ok: boolean;
  tweet: TweetWithUser;
  isLiked: boolean;
}

const ItemDetial = () => {
  // useUser훅을 사용하면 로그아웃 된 상태에선 /enter로 리디렉션 됨
  const { user } = useUser();

  const router = useRouter();
  // unbound mutate
  const { mutate } = useSWRConfig();
  // bound mutate
  const { data, mutate: boundMutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/tweets/${router.query.id}` : null
  );

  const [toggleFav] = useMutation(`/api/tweets/${router.query.id}/fav`);

  // /api/tweets/[id]/fav로 POST요청 보내기
  const onFavClick = () => {
    if (!data) return;
    boundMutate((prev) => prev && { ...prev, isLiked: !prev?.isLiked }, false);

    // 기존에 요청한 데이터를 인자로 주는 함수를 보냄.
    // prev => !prev로
    mutate("/api/users/me", (prev: any) => ({ ok: !prev.ok }), false);
  };

  return (
    <Layout canGoBack>
      <div>
        <div>
          <div />
          <div>
            <div />
            <div>
              <p>{data?.tweet?.user?.name}</p>
              <Link
                legacyBehavior
                href={`/users/profiles/${data?.tweet?.user?.id}`}
              >
                <a>View profile &rarr;</a>
              </Link>
            </div>
          </div>
          <div>
            <Button large text="Talk to seller" />
            <button
              onClick={onFavClick}
              className={cls(
                "p-3 rounded-md flex items-center justify-center  hover:bg-gray-100 ",
                data?.isLiked
                  ? "text-red-500 hover:text-red-600"
                  : "text-gray-400 hover:text-gray-500"
              )}
            >
              {data?.isLiked ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetial;
