import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { Button, Input } from "@/components";
import { useSignUp } from "@/hooks";

type SignUpFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
  const [ageChecked, setAgeChecked] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const { handleSignUp, errorMessage, isLoading } = useSignUp();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>({
    mode: "onChange",
  });

  const password = watch("password");

  const hasAllConsent = useMemo(
    () => ageChecked && consentChecked,
    [ageChecked, consentChecked],
  );

  const isButtonDisabled = useMemo(
    () => !hasAllConsent || isLoading,
    [hasAllConsent, isLoading],
  );

  const onSubmit = async (data: SignUpFormData) => {
    if (!hasAllConsent) {
      return;
    }
    await handleSignUp(data.email, data.password, hasAllConsent);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-purple-200 via-blue-200 to-purple-300 p-4">
      <main className="glass-container flex w-full max-w-lg flex-col items-center gap-4 px-6 py-8 sm:gap-6 sm:px-10 sm:py-10">
        <img
          src="https://nng-phinf.pstatic.net/MjAyNTAzMTZfMjMz/MDAxNzQyMDU0NTAyMDY4.VnZJ8y2dPYjw2CmwOlgEcBEjK7fdNWaWFK3gTlx_-XMg.Mfk1lDB-NjByuqHR_q4lpqfuZZISIp67JRPe1Pk5Twwg.PNG/123.png?type=f120_120_na"
          alt="온유 ONU 로고"
          className="mb-2 h-16 w-16 rounded-full bg-white/70 shadow-xl ring-2 ring-indigo-200"
        />

        <h1 className="moving-gradient-text mb-1 text-center text-xl font-extrabold tracking-tight sm:text-2xl md:text-3xl">
          온유 노래책 회원가입
        </h1>

        <p className="text-center text-xs text-gray-700 sm:text-sm">
          즐겨찾기와 다양한 개인화 기능(추가예정)을 사용해보세요
          <br />
          온유 노래책은 회원가입 후 다음 정보를 수집하며,
          <br />
          서비스 제공 목적 외에는 사용되지 않습니다:
        </p>

        <ul className="list-disc space-y-1 pl-5 text-xs text-gray-700 sm:text-sm">
          <li>이메일 주소</li>
          <li>닉네임 (이름)</li>
          <li>프로필 이미지 (선택)</li>
          <li>서비스 이용 기록: 신청한 곡, 즐겨찾기 내역, 이용 통계 등</li>
        </ul>

        <p className="text-center text-xs text-gray-500">
          자세한 사항은
          <Link
            to="/privacy"
            className="text-indigo-500 underline hover:text-indigo-700"
          >
            개인정보 처리방침
          </Link>
          을 참조하세요.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4"
        >
          <Input
            type="email"
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
            placeholder="비밀번호를 입력하세요 (최소 6자)"
            error={errors.password?.message}
            {...register("password", {
              required: "비밀번호를 입력해주세요",
              minLength: {
                value: 6,
                message: "비밀번호는 최소 6자 이상이어야 합니다",
              },
            })}
          />

          <Input
            type="password"
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력하세요"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              required: "비밀번호 확인을 입력해주세요",
              validate: (value) =>
                value === password || "비밀번호가 일치하지 않습니다",
            })}
          />

          <div className="flex w-full flex-col gap-2 text-sm text-gray-800">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={ageChecked}
                onChange={(e) => setAgeChecked(e.target.checked)}
                className="cursor-pointer accent-indigo-500"
              />
              <span>만 14세 이상입니다.</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={consentChecked}
                onChange={(e) => setConsentChecked(e.target.checked)}
                className="cursor-pointer accent-indigo-500"
              />
              <span>개인정보 수집 및 이용에 동의합니다.</span>
            </label>
          </div>

          <Button
            type="submit"
            variant="LOGIN_BUTTON"
            disabled={isButtonDisabled}
            className={`${isLoading ? "cursor-wait" : ""} ${hasAllConsent ? "bg-white" : "bg-gray-200/50"}`}
          >
            <span className="text-gray-700">
              {isLoading ? "회원가입 중..." : "회원가입"}
            </span>
          </Button>

          {errorMessage && (
            <div className="mt-1 min-h-[1.8em] text-center text-sm text-rose-500">
              {errorMessage}
            </div>
          )}

          <div className="mt-2 text-center text-sm text-gray-600">
            이미 계정이 있으신가요?{" "}
            <Link
              to="/login"
              className="text-indigo-500 underline hover:text-indigo-700"
            >
              로그인
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
