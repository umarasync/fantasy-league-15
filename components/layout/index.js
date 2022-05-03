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

const Layout = ({
  children,
  title,
  showToast,
  autoClose = 3000,
  bg = { url: "", cls: "" },
}) => {
  const [wWidth, wHeight] = useWindowSize();

  // Background Image
  const { url, cls } = bg;
  const mainBg = url
    ? `${url} bg-[length:100%_100%] bg-no-repeat w-full ${cls}`
    : "";

  // Screen sizes
  const screenSizes = {
    lg: 1440,
    sm: 375,
  };

  /*****
   * Set font size for html tag and all the dom elements
   * will change accordingly using rem
   ***/
  const setHTMLTagFontSize = () => {
    let el = document.getElementsByTagName("html");
    let elStyle = el[0].style;

    // Smaller screen
    // TODO: Enable it when to make mobile responsive
    // if (wWidth <= 375) {
    //   return (elStyle.fontSize = `${(wWidth / screenSizes.sm) * 10}px`);
    // }
    return (elStyle.fontSize = `${(wWidth / screenSizes.lg) * 10}px`);
  };

  // Main tag style object
  const mainStyleObj = () => {
    return { minHeight: wHeight };
  };

  useEffect(() => {
    setHTMLTagFontSize();
  }, [wWidth]);

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
      <main style={mainStyleObj()} className={`${mainBg}`}>
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
