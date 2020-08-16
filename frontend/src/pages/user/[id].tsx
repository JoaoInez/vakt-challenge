import User from "components/User";
import useAuth from "hooks/useAuth";

const user = () => {
  const { user, loading } = useAuth();
  if (!loading && user) return <User />;
  return null;
};

export default user;
