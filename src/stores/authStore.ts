import { create } from "zustand";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/supabase/supabase";

type UserProfileStats = {
  user_id: string;
  email?: string;
  avatar_url?: string;
  created_at?: string;
  favorite_count?: number;
  request_count?: number;
  last_requested_song?: string;
  [key: string]: unknown;
};

type AuthState = {
  session: Session | null;
  user: User | null;
  userProfile: UserProfileStats | null;
  isLoading: boolean;
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  setUserProfile: (userProfile: UserProfileStats | null) => void;
  setLoading: (isLoading: boolean) => void;
  initializeAuth: () => Promise<void>;
  fetchUserProfile: (userId: string) => Promise<void>;
  ensureUserProfileStats: (userId: string) => Promise<void>;
  signOut: () => Promise<void>;
  deleteAccount: (
    userId: string,
  ) => Promise<{ success: boolean; error?: string }>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  user: null,
  userProfile: null,
  isLoading: true,

  setSession: (session) => set({ session }),
  setUser: (user) => set({ user }),
  setUserProfile: (userProfile) => set({ userProfile }),
  setLoading: (isLoading) => set({ isLoading }),

  fetchUserProfile: async (userId: string) => {
    try {
      // 회원가입 시 user_profile_stats 초기 레코드 생성
      await get().ensureUserProfileStats(userId);

      const { data, error } = await supabase
        .from("user_profile_stats")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error || !data) {
        console.error("Error fetching user profile:", error);
        set({ userProfile: null });
        return;
      }

      // Supabase Auth에서 이메일과 가입일 정보 가져오기
      const currentUser = get().user;
      const userProfile: UserProfileStats = Object.assign(
        {},
        data as UserProfileStats,
        {
          email: currentUser?.email ?? undefined,
          created_at: currentUser?.created_at ?? undefined,
        },
      );

      set({ userProfile });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      set({ userProfile: null });
    }
  },

  ensureUserProfileStats: async (userId: string) => {
    const { data: profile } = await supabase
      .from("user_profile_stats")
      .select("user_id")
      .eq("user_id", userId)
      .maybeSingle();

    if (!profile) {
      // 레코드가 없으면 초기 레코드 생성
      const { error } = await supabase
        .from("user_profile_stats")
        .insert([{ user_id: userId, favorites: [] }] as never);

      if (error) {
        console.error("user_profile_stats 초기 레코드 생성 실패:", error);
      }
    }
  },

  initializeAuth: async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      set({
        session,
        user: session?.user ?? null,
        isLoading: false,
      });

      if (session?.user?.id) {
        await get().fetchUserProfile(session.user.id);
      }

      supabase.auth.onAuthStateChange(async (_event, session) => {
        set({
          session,
          user: session?.user ?? null,
        });

        if (session?.user?.id) {
          await get().fetchUserProfile(session.user.id);
        } else {
          set({ userProfile: null });
        }
      });
    } catch (error) {
      console.error("Auth initialization error:", error);
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    try {
      await supabase.auth.signOut();
      set({
        session: null,
        user: null,
        userProfile: null,
      });
    } catch (error) {
      console.error("Sign out error:", error);
    }
  },

  deleteAccount: async (userId: string) => {
    try {
      // user_profile_stats에서 사용자 데이터 삭제
      const { error: profileError } = await supabase
        .from("user_profile_stats")
        .delete()
        .eq("user_id", userId);

      if (profileError) {
        console.error("Error deleting user profile stats:", profileError);
        return { success: false, error: profileError.message };
      }

      // users 테이블에서 사용자 데이터 삭제
      const { error: userError } = await supabase
        .from("users")
        .delete()
        .eq("id", userId);

      if (userError) {
        console.error("Error deleting user from users table:", userError);
        // users 테이블이 없거나 삭제 실패해도 계속 진행
        // (일부 환경에서는 users 테이블이 없을 수 있음)
      }

      // Supabase Auth에서 로그아웃
      const { error: authError } = await supabase.auth.signOut();

      if (authError) {
        console.error("Error signing out:", authError);
      }

      // 상태 초기화
      set({
        session: null,
        user: null,
        userProfile: null,
      });

      return { success: true };
    } catch (error) {
      console.error("Delete account error:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.",
      };
    }
  },
}));
