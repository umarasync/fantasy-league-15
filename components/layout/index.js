// Packages
import Head from 'next/head'
import { motion} from "framer-motion";

// Animations
import {fadeInAndOutAnimation1} from "Animations/universal/FadeInOutAnimation1";

const Layout = ({ children, title }) => {

    return (
        <motion.div variants={fadeInAndOutAnimation1()} initial="initial" animate="animate" exit="exit">
            <Head><title>{`Fantasy League ${title}`}</title></Head>
            <main> {children} </main>
        </motion.div>
    )
}
export default Layout
