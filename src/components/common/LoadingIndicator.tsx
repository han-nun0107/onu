type LoadingIndicatorProps = {
  message?: string;
};

export default function LoadingIndicator({
  message = "더 불러오는 중...",
}: LoadingIndicatorProps) {
  return (
    <div className="col-span-full flex items-center justify-center py-4">
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
}

