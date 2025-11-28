import { cn } from "@/utils";

type ToggleButton = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  active?: boolean;
};

type ToggleButtonGroupProps = {
  buttons: ToggleButton[];
};

const buttonGradients = [
  "from-green-400 to-blue-500", // 메뉴
  "from-purple-400 to-blue-500", // 정렬
  "from-pink-400 to-orange-400", // 필터
];

export default function ToggleButtonGroup({
  buttons,
}: ToggleButtonGroupProps) {
  return (
    <div className="fixed right-2 bottom-2 z-50 flex flex-col items-center gap-3 sm:right-4 sm:bottom-4 md:right-8 md:bottom-6">
      {buttons.map((button, index) => {
        const gradient = buttonGradients[index] || "from-gray-400 to-gray-500";
        return (
          <button
            key={button.id}
            onClick={button.onClick}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl",
              gradient,
              button.active && "ring-4 ring-white/50",
            )}
            aria-label={button.label}
          >
            {button.icon}
          </button>
        );
      })}
    </div>
  );
}
