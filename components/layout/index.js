import Head from 'next/head'

const Layout = ({ children, title }) => {
    return (
        <>
            <Head><title>{`Fantasy League ${title}`}</title></Head>
            <main>
                {children}
            </main>
        </>
    )
}
export default Layout
