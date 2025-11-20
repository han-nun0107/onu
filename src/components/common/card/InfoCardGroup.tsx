import type { InfoCardGroupData } from "@/types";
import { getDescriptionClassName, getDescriptionStyle } from "@/utils";

type InfoCardProps = {
  data: InfoCardGroupData;
};

const TITLE_TO_ID_MAP: Record<string, string> = {
  "총 곡수": "total-songs",
  "🎙️신청방법": "total-categories",
  "💣곡 안내": "total-artists",
} as const;

export default function InfoCardGroup({ data }: InfoCardProps) {
  const {
    number,
    numberColor = "text-indigo-600",
    title,
    description,
    subDescription,
    descriptionColor,
  } = data;

  const elementId = TITLE_TO_ID_MAP[title];

  return (
    <article className="mb-10">
      <div className="flex h-30 w-71 flex-col items-center justify-center rounded-xl bg-white/70 shadow-xl transition-transform duration-300 ease-out will-change-transform hover:scale-105">
        {number !== undefined && (
          <div className={`text-lg font-black ${numberColor}`} id={elementId}>
            {number}
          </div>
        )}
        <div className="mt-2 text-base font-bold text-[#374151]">{title}</div>
        {description && (
          <div
            className={`${getDescriptionClassName(descriptionColor)} mt-2 text-xs font-bold`}
            style={getDescriptionStyle(descriptionColor)}
          >
            {description}
          </div>
        )}
        {subDescription && (
          <div className="mt-[2px] text-[10px] font-semibold text-[#1f2937]">
            {subDescription}
          </div>
        )}
      </div>
    </article>
  );
}
