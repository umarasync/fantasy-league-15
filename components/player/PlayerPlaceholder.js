// Components
import PrimaryButtonSmall from "components/buttons/PrimaryButtonSmall";

// Utils
import R from "utils/getResponsiveValue";

export default function PlayerPlaceholder ({
    style
}) {
    return(
        <div className="inline-flex justify-center flex-col items-center" style={{ ...style }}>
            <div style={{ width: R(40)}}>
                <img src="/images/player_empty.png" alt="" width='100%' height='100%'/>
            </div>
            <PrimaryButtonSmall title={'Add goalkeeper'} style={{
                textTransform: 'lowercase'
            }} />
        </div>
    )
}