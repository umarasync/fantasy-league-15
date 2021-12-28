import R from "../../utils/getResponsiveValue";
import PrimaryButton from "../buttons/primaryButton";

export default function clubControls({
     onControlsClick
 }){
    return (
        <div className="flex items-center justify-center">
            <div
                style={{
                    width: R(318),
                    marginTop: R(-35),
                    zIndex: 1,
                    marginBottom: (80)
                }}
            >
                <PrimaryButton
                    title={'select'}
                    style={{
                        marginBottom: R(40),
                        height: R(70),
                    }}
                    textStyle={{
                        fontSize: R(16)
                    }}
                />
                <div className="flex justify-center">
                    <img
                        src="/images/left_arrow_select_club.png"
                        alt=""
                        className="mr-[1rem] cursor-pointer"
                        width={R(60)}
                        height={R(60)}
                        onClick={() => onControlsClick(true)}
                    />
                    <img
                        src="/images/right_arrow_select_club.png"
                        alt=""
                        className="ml-[1rem] cursor-pointer"
                        width={R(60)}
                        height={R(60)}
                        onClick={() => onControlsClick()}
                    />
                </div>
            </div>
        </div>
    )
}