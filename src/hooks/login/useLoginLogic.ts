import { useMemo, useState, useCallback } from "react";
import { useLogin } from "@/hooks/login/useLogin";
import { useEmailLogin } from "@/hooks";

type LoginMethod = "email" | "google";

export const useLoginLogic = () => {
  const [loginMethod, setLoginMethod] = useState<LoginMethod>("email");

  const {
    handleLogin,
    errorMessage: googleErrorMessage,
    isLoading: isGoogleLoading,
  } = useLogin();

  const {
    handleEmailLogin,
    errorMessage: emailErrorMessage,
    isLoading: isEmailLoading,
  } = useEmailLogin();

  const isLoading = useMemo(
    () => (loginMethod === "email" ? isEmailLoading : isGoogleLoading),
    [loginMethod, isEmailLoading, isGoogleLoading],
  );

  const errorMessage = useMemo(
    () => (loginMethod === "email" ? emailErrorMessage : googleErrorMessage),
    [loginMethod, emailErrorMessage, googleErrorMessage],
  );

  const isButtonDisabled = useMemo(() => isLoading, [isLoading]);

  const buttonClassName = useMemo(
    () => `${isLoading ? "cursor-wait" : ""} bg-white`,
    [isLoading],
  );

  const onEmailSubmit = useCallback(
    async (email: string, password: string) => {
      await handleEmailLogin(email, password, true);
    },
    [handleEmailLogin],
  );

  const onGoogleLogin = useCallback(() => {
    handleLogin(true);
  }, [handleLogin]);

  const handleLoginMethodChange = useCallback((method: LoginMethod) => {
    setLoginMethod(method);
  }, []);

  return {
    loginMethod,
    isLoading,
    errorMessage,
    isButtonDisabled,
    buttonClassName,
    onEmailSubmit,
    onGoogleLogin,
    handleLoginMethodChange,
  };
};
