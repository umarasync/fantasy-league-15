// Components
import Layout from "components/layout/index";

// Utils
import R from "utils/getResponsiveValue";

export default function BuildTeamAllPlayer () {
    return (
        <Layout title="Build Team All Player">
            <div className="mx-auto bg-white">
                <div className="">
                    {/*Left Section*/}
                    <div className="w-[57%]">
                        <div className="bg-[url('/images/bg-blue.png')] bg-[length:100%_100%] bg-cover bg-center bg-no-repeat  w-full h-full" style={{
                            paddingTop: R(34),
                            paddingLeft: R(81.26),
                            paddingRight: R(81.26),
                            // height: R(1050, '', true)
                        }}>
                            <div className="" style={{
                                width: R(164),
                                height: R(40),
                            }}>
                                <img src="/images/logo_white.png" alt="" width="100%" height="100%"/>
                            </div>

                            <div className="mt-[5rem] flex flex-col items-center">
                                <p
                                    className="uppercase font-[900] italic text-white"
                                    style = {{
                                        fontSize: R(42),
                                        lineHeight: R(46, 'px')
                                    }}
                                >
                                    make your selection
                                </p>
                                <p
                                    className="font-[300] text-center text-lavender_grey"
                                    style={{
                                        fontSize: R(18),
                                        lineHeight: R(26, 'px'),
                                        marginTop: R(20)
                                    }}
                                >
                                    Select a maximum of 3 players from a single team <br/>{`or 'Auto Pick' if you're short of time.`}
                                </p>
                            </div>

                            <div className=""
                                 style={{
                                     width: R(626),
                                     height: R(621),
                                     marginTop: R(40)
                                 }}
                            >
                                <div className="bg-[url('/images/field1.png')] bg-[length:100%_100%] bg-no-repeat h-full w-full" >

                                </div>
                            </div>


                        </div>
                    </div>
                    {/*Right Section*/}
                    <div className="w-[43%]">

                    </div>
                </div>
            </div>
        </Layout>
    )
}