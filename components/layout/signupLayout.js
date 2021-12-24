// Packages
import Link from 'next/link'

// Components
import Layout from "components/layout";
import PrimaryButton from "components/buttons/primaryButton";

export default function SignUpLayout({
    logo = 'bg-blue.png',
    title,
    heading,
    footerHeading,
    buttonTitle = 'Next',
    onClick = () => false,
    children,
    disabled
}) {
    return (
        <Layout title="Sign Up">
            <div className="mx-auto bg-white">
                <div className="grid grid-cols-2 flex h-screen">
                    <div className={`bg-[url('/images/${logo}')] bg-[length:100%_100%] bg-no-repeat`} >
                        <div className="h-screen relative">
                            <div className="flex flex-col w-full mx-[8rem]">
                                <p className="text-white mt-[10rem] text-[5rem] italic font-black w-[60rem] leading-[5.5rem]">{`explore Eredivisie fantasy league`.toUpperCase()}</p>
                                <p className="mt-[2rem] text-white text-[1.8rem] opacity-70 w-[50rem] normal">Be in the role of a Fantasy manager and lead dream team! <br/> Absolutely free, absolutely immersive experience.</p>
                            </div>
                            <img src="/images/players.png" alt="" className="absolute bottom-0 w-[100%]"/>
                        </div>
                    </div>
                    <div className="flex flex-col items-center pt-[7rem]">
                        <img src="/images/fantasy_15.png" alt="" className="w-[11rem] h-[2.6rem] mb-[4.7rem]" />
                        <p className="mb-[2rem] italic text-[3.2rem] leading-[4rem] font-[800] text-black_rock uppercase">{title}</p>
                        <p className="mb-[3.2rem] text-regent_grey text-[1.8rem] normal">{heading}</p>
                        <div className="flex flex-col w-[41rem]">
                            {children}
                            <PrimaryButton title={buttonTitle} onClick={onClick} disabled={disabled} style="mb-[4rem]"/>
                            <p className="text-regent_grey text-[1.6rem] font-[400] leading-[2rem] text-center">{footerHeading.name} <Link href={footerHeading.link} as={footerHeading.link}><a className="text-brick_red font-[600]">{footerHeading.buttonTitle}</a></Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
