import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "react-toastify";

type UseDeleteAccountReturn = {
  isDeleting: boolean;
  handleDeleteAccount: () => Promise<void>;
};

export const useDeleteAccount = (): UseDeleteAccountReturn => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const userId = useAuthStore((state) => state.user?.id);
  const deleteAccount = useAuthStore((state) => state.deleteAccount);

  const handleDeleteAccount = useCallback(async () => {
    if (!userId) {
      toast.error("사용자 정보를 찾을 수 없습니다.");
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deleteAccount(userId);

      if (result.success) {
        toast.success("회원 탈퇴가 완료되었습니다.");
        navigate("/");
      } else {
        toast.error(result.error || "회원 탈퇴 중 오류가 발생했습니다.");
      }
    } catch (error) {
      toast.error("회원 탈퇴 중 오류가 발생했습니다.");
    } finally {
      setIsDeleting(false);
    }
  }, [userId, deleteAccount, navigate]);

  return {
    isDeleting,
    handleDeleteAccount,
  };
};
