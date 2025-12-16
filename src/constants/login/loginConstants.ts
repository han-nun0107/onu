export const CONSENT_CHECKBOXES = [
  {
    id: "age",
    label: "만 14세 이상입니다.",
    key: "ageChecked" as const,
  },
  {
    id: "consent",
    label: "개인정보 수집 및 이용에 동의합니다.",
    key: "consentChecked" as const,
  },
] as const;

export const LOGIN_METHODS = [
  {
    id: "email",
    label: "이메일 로그인",
    value: "email" as const,
  },
  {
    id: "google",
    label: "Google 로그인",
    value: "google" as const,
  },
] as const;

export const PRIVACY_INFO_ITEMS = [
  "이메일 주소",
  "닉네임 (이름)",
  "프로필 이미지 (선택)",
  "서비스 이용 기록: 신청한 곡, 즐겨찾기 내역, 이용 통계 등",
] as const;
