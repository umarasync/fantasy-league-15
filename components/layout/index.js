import Head from 'next/head'
import { motion} from "framer-motion";

const Layout = ({ children, title }) => {

    const duration = 0.3
    const fadeInOutAnimation = {
        initial: {
            opacity: 0.3
        },
        animate: {
            opacity: 1,
            transition: {
                duration: duration
            },
        },
        exit: {
            opacity: 0.3,
            transition: {
                duration: duration,
            },
        },
    };

    return (
        <motion.div variants={fadeInOutAnimation} initial="initial" animate="animate" exit="exit">
            <Head><title>{`Fantasy League ${title}`}</title></Head>
            <main> {children} </main>
        </motion.div>
    )
}
export default Layout
