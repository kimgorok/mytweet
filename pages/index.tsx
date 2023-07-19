import useSWR from "swr";
import useUser from "../lib/client/useUser";
import Layout from "./components/layout";
import Head from "next/head";
import Item from "./components/item";
import FloatingButton from "./components/floating-button";

export default () => {
  const { data } = useSWR("/api/tweets");
  const { user } = useUser();

  return (
    <Layout title="홈">
      <Head>
        <title>홈</title>
      </Head>
      <div>
        {data?.tweets?.map((tweet: any) => (
          <Item
            id={tweet.id}
            text={tweet.text}
            hearts={tweet._count.favs}
          ></Item>
        ))}
        <FloatingButton href="/mytweet/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};
