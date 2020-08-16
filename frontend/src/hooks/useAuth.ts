import { useEffect } from "react";
import useSessionContext from "./useSessionContext";
import { useRouter } from "next/router";

const useAuth = () => {
  const [session] = useSessionContext();
  const router = useRouter();

  useEffect(() => {
    if (!session.loading && !session.user) router.replace("/login");
  }, []);

  return session;
};

export default useAuth;
