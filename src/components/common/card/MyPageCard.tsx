import { cn } from "@/utils/cn";

type MyPageCardProps = {
  count: number;
  label: string;
  favorite?: boolean;
};

export default function MyPageCard({
  count,
  label,
  favorite,
}: MyPageCardProps) {
  return (
    <div className="flex h-16 w-52 flex-col items-center justify-center gap-1 rounded-lg bg-white/50 shadow">
      <p
        className={cn(
          "text-lg font-bold",
          favorite ? "text-pink-500" : "text-indigo-500",
        )}
      >
        {count || 0}
      </p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
}
