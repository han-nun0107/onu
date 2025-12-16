import { useMemo, useState, useCallback } from "react";
import { useLogin } from "@/hooks/login/useLogin";
import { useEmailLogin } from "@/hooks";

type LoginMethod = "email" | "google";

export const useLoginLogic = () => {
  const [ageChecked, setAgeChecked] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
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

  const hasAllConsent = useMemo(
    () => ageChecked && consentChecked,
    [ageChecked, consentChecked],
  );

  const isLoading = useMemo(
    () => (loginMethod === "email" ? isEmailLoading : isGoogleLoading),
    [loginMethod, isEmailLoading, isGoogleLoading],
  );

  const errorMessage = useMemo(
    () => (loginMethod === "email" ? emailErrorMessage : googleErrorMessage),
    [loginMethod, emailErrorMessage, googleErrorMessage],
  );

  const isButtonDisabled = useMemo(
    () => !hasAllConsent || isLoading,
    [hasAllConsent, isLoading],
  );

  const buttonClassName = useMemo(
    () =>
      `${isLoading ? "cursor-wait" : ""} ${hasAllConsent ? "bg-white" : "bg-gray-200/50"}`,
    [isLoading, hasAllConsent],
  );

  const onEmailSubmit = useCallback(
    async (email: string, password: string) => {
      if (!hasAllConsent) {
        return;
      }
      await handleEmailLogin(email, password, hasAllConsent);
    },
    [hasAllConsent, handleEmailLogin],
  );

  const onGoogleLogin = useCallback(() => {
    if (!hasAllConsent) {
      return;
    }
    handleLogin(hasAllConsent);
  }, [hasAllConsent, handleLogin]);

  const handleConsentChange = useCallback(
    (key: "ageChecked" | "consentChecked", checked: boolean) => {
      if (key === "ageChecked") {
        setAgeChecked(checked);
      } else {
        setConsentChecked(checked);
      }
    },
    [],
  );

  const handleLoginMethodChange = useCallback((method: LoginMethod) => {
    setLoginMethod(method);
  }, []);

  return {
    ageChecked,
    consentChecked,
    loginMethod,
    hasAllConsent,
    isLoading,
    errorMessage,
    isButtonDisabled,
    buttonClassName,
    onEmailSubmit,
    onGoogleLogin,
    handleConsentChange,
    handleLoginMethodChange,
  };
};
