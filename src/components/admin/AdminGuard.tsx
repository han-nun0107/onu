import { useSupabaseSession } from "@/provider/supabaseProvider";
import { isAdmin } from "@/utils/isAdmin";
import { useEditModeStore } from "@/stores/editModeStore";
import { Navigate } from "react-router";

export const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const { session } = useSupabaseSession();
  const userId = session?.user.id;
  const { isEditMode } = useEditModeStore();

  // 어드민이면서 Edit 모드일 때만 접근 허용
  return isAdmin(userId) && isEditMode ? (
    <>{children}</>
  ) : (
    <Navigate to="/" />
  );
};
