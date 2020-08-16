import Listings from "components/Listings";
import useAuth from "hooks/useAuth";

const listings = () => {
  const { user, loading } = useAuth();
  if (!loading && user) return <Listings />;
};

export default listings;
