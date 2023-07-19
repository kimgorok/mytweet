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

const Login = () => {
  const [enter, { loading, data, error }] =
    useMutation<MutationResult>("/api/users/login");

  const { register, handleSubmit } = useForm<EnterForm>();

  const router = useRouter();

  const onVaild = (validForm: EnterForm) => {
    if (loading) return;
    // 입력 데이터의 키를 맞게 수정하여 사용자 이름과 전화번호를 함께 전송
    enter({ userName: validForm.name, phoneNum: validForm.phone });
  };

  useEffect(() => {
    if (data?.ok) {
      router.push("/");
    }
  }, [data, router]);

  return (
    <div>
      <div>여긴 로그인</div>
      <form onSubmit={handleSubmit(onVaild)}>
        {/* 사용자 이름 입력 필드 */}
        <Input
          register={register("name", { required: true })}
          name="name"
          label="이름을 입력하세요" // 라벨 텍스트 수정
          type="text" // 타입을 'text'로 변경
          required
        />
        {/* 전화번호 입력 필드 */}
        <Input
          register={register("phone", {
            required: true,
          })}
          name="phone"
          label="번호를 입력하세요" // 라벨 텍스트 수정
          type="number"
          required
        />
        <Button text="로그인"></Button>
      </form>
    </div>
  );
};

export default Login;
