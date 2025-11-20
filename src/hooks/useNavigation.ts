import { useNavigate } from "react-router";
import { useAuthStore } from "@/stores/authStore";

export function useNavigation() {
  const navigate = useNavigate();
  const session = useAuthStore((state) => state.session);

  const navigateToLogin = () => navigate("/login");
  const navigateToMyPage = () => navigate("/my-page");
  const navigateToAuth = () => {
    if (session) {
      navigateToMyPage();
    } else {
      navigateToLogin();
    }
  };

  return {
    navigateToLogin,
    navigateToMyPage,
    navigateToAuth,
  };
}
