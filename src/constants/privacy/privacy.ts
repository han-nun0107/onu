type PrivacySection = {
  id: number;
  title: string;
  type: "list" | "paragraph" | "contact";
  content: string[] | string;
};

export const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    id: 1,
    title: "수집하는 개인정보 항목",
    type: "list",
    content: [
      "이메일 주소",
      "이름 (닉네임)",
      "프로필 사진 (선택)",
      "서비스 이용 기록: 신청한 곡 제목, 즐겨찾기 내역, 신청 횟수, 마지막 신청곡 등",
    ],
  },
  {
    id: 2,
    title: "수집 목적",
    type: "list",
    content: [
      "회원 식별 및 로그인 기능 제공",
      "즐겨찾기, 신청곡 기록 등 개인화 기능 제공",
      "신청 이력 및 이용 통계를 통한 서비스 개선",
    ],
  },
  {
    id: 3,
    title: "보유 및 이용 기간",
    type: "paragraph",
    content:
      "회원 탈퇴 시 즉시 파기합니다. 다만, 관련 법령에 따라 일정 기간 보존이 필요한 경우 해당 법령에 따릅니다.",
  },
  {
    id: 4,
    title: "개인정보의 저장 및 처리 위탁",
    type: "paragraph",
    content:
      "수집된 개인정보는 Supabase 등 외부 클라우드 플랫폼에 저장될 수 있으며, 이 경우 서비스 제공 목적 내에서만 안전하게 관리됩니다. 개인정보는 어떠한 외부 제3자에게도 제공되지 않습니다.",
  },
  {
    id: 5,
    title: "개인정보의 파기 절차 및 방법",
    type: "paragraph",
    content:
      "서비스 탈퇴 시 수집된 개인정보는 즉시 파기됩니다. 전자적 파일 형태는 복구 불가능한 방식으로 삭제됩니다.",
  },
  {
    id: 6,
    title: "이용자의 권리",
    type: "paragraph",
    content:
      "이용자는 언제든지 개인정보 조회, 수정, 삭제 요청을 할 수 있습니다. 관련 요청은 아래 연락처를 통해 가능합니다.",
  },
  {
    id: 7,
    title: "개인정보 보호책임자",
    type: "contact",
    content: "contact",
  },
];

export const CONTACT_INFO = {
  email: "tirslofficial@gmail.com",
  responsible: "STROAGE22",
};

export const EFFECTIVE_DATE = "2025년 8월 2일";
