import "../styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { Provider } from "react-redux";
import store from "../redux/store/";

//Apollo
import { ApolloProvider } from "@apollo/client";
import { createApolloClient } from "graphql/apollo";
import {ProtectRoute} from "../components/auth/ProtectedRoute";
import {AuthProvider} from "../context/authContext";
const apolloClient = createApolloClient();

function MyApp({ Component, pageProps, router }) {
  return (
    <AnimatePresence exitBeforeEnter>
      <ApolloProvider client={apolloClient}>
        <Provider store={store} key={router.route}>
            {/*AuthProvider & ProtectedRoute are for authentication*/}
            <AuthProvider>
                <ProtectRoute>
                   <Component {...pageProps} key={router.route} />
               </ProtectRoute>
            </AuthProvider>
        </Provider>
      </ApolloProvider>
    </AnimatePresence>
  );
}

export default MyApp;
