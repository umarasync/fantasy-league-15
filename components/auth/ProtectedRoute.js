// Packages
import {useRouter} from "next/router";

// Components
import Loader from "components/loaders/Loader";

// Auth-Context
import {AuthProvider, useAuth} from "context/authContext";

// Constants
import {publicRoutes} from "constants/universalConstants";

export const ProtectRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  const router = useRouter();

  if (loading || (!isAuthenticated) && !publicRoutes.includes(router.pathname)){
    return <Loader />;
  }
  return children;
};



