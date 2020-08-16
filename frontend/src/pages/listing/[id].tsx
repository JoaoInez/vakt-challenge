import Listing from "components/Listing";
import useAuth from "hooks/useAuth";

const listingId = () => {
  const { user, loading } = useAuth();
  if (!loading && user) return <Listing />;
};

export default listingId;
