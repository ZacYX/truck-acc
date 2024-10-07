import { useSession } from "next-auth/react";

export function useCurrentUser() {
  const user = useSession().data?.user;
  return user;
}
