import "../styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { Provider } from "react-redux";
import store from "../redux/store/";

function MyApp({ Component, pageProps, router }) {
  return (
    <AnimatePresence exitBeforeEnter>
      <Provider store={store}>
        <Component {...pageProps} key={router.route} />
      </Provider>
    </AnimatePresence>
  );
}

export default MyApp;
