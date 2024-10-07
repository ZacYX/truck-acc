"use client";

import { Session, User } from "next-auth";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";

type ProviderContextType = {
  session: Session | null,
  updateSession: (session: Session) => void,
}

export const SessionContext = createContext<ProviderContextType>({} as ProviderContextType);

export default function SessionContextProvider({ children }: { children: ReactNode }) {
  const { data: sessionData, status } = useSession();
  const [session, setSession] = useState<Session | null>(null);

  const updateSession = (updatedSession: Session | null) => {
    console.log("upadateSession" + JSON.stringify(updatedSession));
    if (updatedSession) {
      setSession(updatedSession);
    }
  }

  useEffect(() => {
    console.log("in useEffect status: " + status);
    console.log("upadate session:" + JSON.stringify(sessionData));
    if (status === "authenticated" && sessionData)
      updateSession(sessionData)
  }, [status, sessionData]);

  return (
    <SessionContext.Provider value={{ session, updateSession }}>
      {children}
    </SessionContext.Provider>
  )
}