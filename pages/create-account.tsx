import { useForm } from "react-hook-form";
import useMutation from "../lib/client/useMutation";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Input from "./components/input";
import Button from "./components/button";

interface MutationResult {
  ok: boolean;
}

interface EnterForm {
  name?: string; // 사용자 이름 필드 추가
  phone?: string;
}

const CreateAccount = () => {
  const [createAccount, { loading, data, error }] = useMutation<MutationResult>(
    "/api/users/create-account" // 수정된 URL
  );

  const { register, handleSubmit } = useForm<EnterForm>();

  const onValid = (validForm: EnterForm) => {
    if (loading) return;
    // 입력 데이터의 키를 맞게 수정
    createAccount({ userName: validForm.name, phoneNum: validForm.phone }); // 이름과 전화번호 함께 전송
  };

  const router = useRouter();
  // 유저 데이터가 존재하면 log-in으로 이동시킴
  useEffect(() => {
    if (data?.ok) {
      router.push("/log-in");
    }
  }, [data, router]);

  const onCreateClick = () => {
    router.push("/log-in");
  };

  return (
    <div>
      <h1>회원가입</h1>
      <div>
        <form onSubmit={handleSubmit(onValid)}>
          {/* 사용자 이름 입력 필드 */}
          <Input
            register={register("name", { required: true })}
            name="name"
            type="text"
            required
            label="name"
          />
          {/* 전화번호 입력 필드 */}
          <Input
            register={register("phone", { required: true })}
            name="phone"
            type="number"
            required
            label="phone"
          />
          <div>
            <Button onClick={onCreateClick} text="계정 생성">
              {loading ? "로딩중..." : "생성"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
