import CreateListing from "components/CreateListing";
import useAuth from "hooks/useAuth";

const listing = () => {
  const { user, loading } = useAuth();
  if (!loading && user) return <CreateListing />;
};

export default listing;
