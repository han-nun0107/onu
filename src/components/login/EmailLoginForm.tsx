import { memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "@/components";
import { Mail } from "lucide-react";

type LoginFormData = {
  email: string;
  password: string;
};

type EmailLoginFormProps = {
  onSubmit: (email: string, password: string) => void;
  isLoading: boolean;
  isButtonDisabled: boolean;
  buttonClassName: string;
};

const EmailLoginForm = memo(
  ({
    onSubmit,
    isLoading,
    isButtonDisabled,
    buttonClassName,
  }: EmailLoginFormProps) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<LoginFormData>({
      mode: "onChange",
    });

    const onFormSubmit = useCallback(
      (data: LoginFormData) => {
        onSubmit(data.email, data.password);
      },
      [onSubmit],
    );

    return (
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="flex w-full flex-col gap-4"
      >
        <Input
          type="text"
          label="이메일"
          placeholder="이메일을 입력하세요"
          error={errors.email?.message}
          {...register("email", {
            required: "이메일을 입력해주세요",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "올바른 이메일 형식이 아닙니다",
            },
          })}
        />

        <Input
          type="password"
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          error={errors.password?.message}
          {...register("password", {
            required: "비밀번호를 입력해주세요",
          })}
        />

        <Button
          type="submit"
          variant="LOGIN_BUTTON"
          disabled={isButtonDisabled}
          className={`w-full ${buttonClassName}`}
        >
          <div className="flex w-full items-center justify-center gap-2">
            <Mail />
            <span className="text-gray-700">
              {isLoading ? "로그인 중..." : "로그인"}
            </span>
          </div>
        </Button>
      </form>
    );
  },
);

EmailLoginForm.displayName = "EmailLoginForm";

export default EmailLoginForm;
