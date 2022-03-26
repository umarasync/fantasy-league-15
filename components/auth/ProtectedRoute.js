// Packages
import {useRouter} from "next/router";

// Components
import Loader from "components/loaders/Loader";

// Auth-Context
import {AuthProvider, useAuth} from "context/authContext";

// Constants
import {publicRoutes} from "constants/universal";

export const ProtectRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading || (!isAuthenticated) && !publicRoutes.includes(router.pathname)){
    return <Loader />;
  }
  return children;
};



