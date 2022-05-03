// Packages
import React, { useEffect } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Animations
import { fadeInAndOutAnimation1 } from "Animations/universal/FadeInOutAnimation1";

// Hooks
import useWindowSize from "hooks/useWindowSize";

const Layout = ({ children, title, showToast, autoClose = 3000 }) => {
  const [width, height] = useWindowSize();

  const screenSizes = {
    lg: 1440,
    sm: 375,
  };

  const setHTMLTagFontSize = () => {
    let el = document.getElementsByTagName("html");
    let elStyle = el[0].style;

    // Smaller screen
    if (width <= 375) {
      return (elStyle.fontSize = `${(width / screenSizes.sm) * 10}px`);
    }
    return (elStyle.fontSize = `${(width / screenSizes.lg) * 10}px`);
  };

  useEffect(() => {
    setHTMLTagFontSize();
  }, [width]);

  return (
    <motion.div
      variants={fadeInAndOutAnimation1()}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Head>
        <title>{`Fantasy League ${title}`}</title>
      </Head>
      <main>
        {showToast && (
          <ToastContainer
            position="top-center"
            autoClose={autoClose}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        )}
        {children}
      </main>
    </motion.div>
  );
};
export default Layout;
