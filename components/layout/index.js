// Packages
import Head from 'next/head'
import { motion} from "framer-motion";
import {ToastContainer} from "react-toastify";
import React from "react";
import "react-toastify/dist/ReactToastify.css";

// Animations
import {fadeInAndOutAnimation1} from "Animations/universal/FadeInOutAnimation1";


const Layout = ({ children, title, showToast }) => {

    return (
        <motion.div variants={fadeInAndOutAnimation1()} initial="initial" animate="animate" exit="exit">
            <Head><title>{`Fantasy League ${title}`}</title></Head>
            <main>
                {showToast && (
                    <ToastContainer
                      position="top-center"
                      autoClose={2000}
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
    )
}
export default Layout
