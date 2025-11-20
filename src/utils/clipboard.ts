import { toast } from "react-toastify";

export async function copyToClipboard(
  text: string,
  successMessage: string,
): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(successMessage);
  } catch (error) {
    console.error("복사 실패:", error);
    toast.error("복사에 실패했습니다. 다시 시도해주세요.");
  }
}
