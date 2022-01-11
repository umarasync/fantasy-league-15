// Components
import Button from "components/html/Button";

// Utils
import R from "utils/getResponsiveValue";

// Styles
const getStyles = (R) => {
    return {
        container: {
            width: R(318),
            marginTop: R(-35),
            zIndex: 1,
            marginBottom: (80)
        },
        buttonStyle: {
            marginBottom: R(40)
        }
    }
}
export default function clubControls({
     onControlsClick,
     onNextClick
 }){

    const STYLES =  { ... getStyles(R) }

    return (
        <div className="flex items-center justify-center">
            <div style={STYLES.container}>
                <Button
                    title={'select'}
                    buttonStyle={STYLES.buttonStyle}
                    onClick={onNextClick}
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