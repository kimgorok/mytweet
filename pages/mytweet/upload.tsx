import { Tweet } from "@prisma/client";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useMutation from "../../lib/client/useMutation";
import { useEffect } from "react";
import Layout from "../components/layout";
import Input from "../components/input";
import TextArea from "../components/textarea";
import Button from "../components/button";

interface UploadTweetForm {
  id: number;
  text: string;
}

interface UploadTweetMutation {
  ok: boolean;
  tweet: Tweet;
}

const Upload = () => {
  const router = useRouter();

  const { register, handleSubmit } = useForm<UploadTweetForm>();

  const [uploadTweet, { loading, data }] =
    useMutation<UploadTweetMutation>("/api/tweets");

  const onValid = (data: UploadTweetForm) => {
    if (loading) return "로딩";
    uploadTweet(data);
  };

  useEffect(() => {
    if (data?.ok) {
      router.push(`/tweets/${data.tweet.id}`);
    }
  }, [data, router]);
  return (
    <Layout canGoBack title="Tweet 작성">
      <form className="p-4 space-y-4" onSubmit={handleSubmit(onValid)}>
        <div>
          <label>
            <input className="hidden" type="file" accept="image/*" />
          </label>
        </div>
        <textarea
          name="message"
          className="border-2 border-[#FC5200] w-full resize-none min-h-[100px] placeholder:pt-1 pl-2"
          placeholder="Write Your Text"
          required
        />
        <button className="w-full  h-9 bg-[#FC5200] hover:bg-orange-600 text-white  px-4 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">
          {loading ? "Loading" : "Upload Tweet"}
        </button>
      </form>
    </Layout>
  );
};

export default Upload;
