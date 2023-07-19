import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  kind?: "text" | "phone" | "price";
  // 이 key가 아무 prop이나 보낼 수 있게 함
  [key: string]: any;
  type: string;
  register: UseFormRegisterReturn;
  required: boolean;
}

export default function Input({
  label,
  name,
  kind = "text",
  register,
  type,
  required,
  // 그리고 그 prop은 여기서 받음
  ...rest
}: InputProps) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      {kind === "text" ? (
        <div>
          <input
            id={name}
            required={required}
            {...register}
            {...rest}
            type={type}
          />
        </div>
      ) : null}
    </div>
  );
}
