// Components
import PrimaryButton from "components/buttons/PrimaryButton";

// Utils
import R from "utils/getResponsiveValue";

// Colors
import colors from "constants/colors";

export default function FooterBar({
    totalSelectedPlayers,
    remainingBudget,
    resetDisabled,
  autoPickDisabled,
  continueDisabled
  }){
    return(
        <div
            className="footer-blue-gradient fixed bg-red-200 w-full bottom-[0] flex items-center"
            style={{
                height: R(104),
                paddingLeft: R(81.26),
                paddingRight: R(81.26)
            }}
        >
            <div className={'flex items-center justify-between w-full'}>
                {/*Left Section*/}
                <div className={'flex items-center'}>
                    <p
                        className={'text-lavender_grey normal'}
                        style={{
                            fontSize: R(18),
                            marginRight: R(14),
                            lineHeight: R(26, 'px')
                        }}
                    >Players</p>
                    <p
                        className={'italic text-white font-[800]'}
                        style={{
                            fontSize: R(28),
                            marginRight: R(32),
                            lineHeight: R(32, 'px')
                        }}
                    >{totalSelectedPlayers} / 15</p>
                    <p className="grey-faded-1 text-white" style={{
                        height: R(60),
                        marginRight: R(32),
                    }}/>

                    <p
                        className={'text-lavender_grey normal'}
                        style={{
                            fontSize: R(18)
                        }}
                    >Remaining budget</p>
                    <div
                        style={{
                            width: R(21),
                            height: R(21),
                            marginLeft: R(9),
                            marginRight: R(17),
                        }}
                    >
                        <img src="/images/info.png" alt="" width={'100%'} height={'100%'}/>
                    </div>

                    <p
                        className={'italic text-white font-[800]'}
                        style={{
                            fontSize: R(28),
                            lineHeight: R(32, 'px')
                        }}
                    > €{remainingBudget} </p>

                </div>

                {/*Right Section*/}
                <div className={'flex items-center text-black_rock'}>
                    <PrimaryButton
                        title={'auto pick'}
                        textClasses={'text-black_rock'}
                        disabled={autoPickDisabled}
                        buttonStyle={{
                            marginRight: R(16)
                        }}
                        style={{
                        boxShadow: 'unset',
                        background: 'white',
                        height: R(50),
                        width: R(190),
                    }}/>
                    <PrimaryButton
                        title={'reset'}
                        textClasses={'text-white'}
                        disabled={resetDisabled}
                        buttonStyle={{
                            marginRight: R(40)
                        }}
                        style={{
                            boxShadow: 'unset',
                            background: colors.rhino,
                            height: R(50),
                            width: R(190)
                        }}
                    />
                    <PrimaryButton
                        title={'continue'}
                        textClasses={'text-white'}
                        disabled={continueDisabled}
                        style={{
                            height: R(50),
                            width: R(163)
                        }}
                    />
                </div>
            </div>

        </div>
    )
}