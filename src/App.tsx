import { useEffect } from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { router } from "@/pages/routes";
import { useAuthStore } from "@/stores/authStore";
import { ToastContainer } from "react-toastify";
import { SupabaseProvider } from "@/provider/supabaseProvider";

function App() {
  const queryClient = new QueryClient();
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
    import("react-toastify/dist/ReactToastify.css");
  }, [initializeAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <SupabaseProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
        />
      </SupabaseProvider>
    </QueryClientProvider>
  );
}

export default App;
