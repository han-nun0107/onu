import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/supabase/supabase";
import type { Session } from "@supabase/supabase-js";

type SupabaseContextType = {
  session: Session | null;
};

const SupabaseContext = createContext<SupabaseContextType>({
  session: null,
});

export const SupabaseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <SupabaseContext.Provider value={{ session }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabaseSession = () => useContext(SupabaseContext);
