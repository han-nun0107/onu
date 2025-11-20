import type { InfoCardGroupData } from "@/types";

export const INFO_CARD_GROUPS = (totalCount: number): InfoCardGroupData[] => [
  {
    number: totalCount,
    numberColor: "text-indigo-600",
    title: "총 곡수",
  },
  {
    numberColor: "text-purple-600",
    title: "🎙️신청방법",
    description: "신청 노래제목 [3,000🧀]",
    descriptionColor: "#667eea",
    subDescription: "⚠️노래신청은 미션이 아니므로 환불이 불가 합니다.⚠️",
  },
  {
    numberColor: "text-pink-600",
    title: "💣곡 안내",
    description: "💣곡 단가: 5,000🧀+",
    descriptionColor: "#f56565",
    subDescription: "💣곡을 신청시, 반드시 채팅 문의하고 신청해주세요!",
  },
];
