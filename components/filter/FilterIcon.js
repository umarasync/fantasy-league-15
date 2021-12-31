// Utils
import R from "utils/getResponsiveValue";
import colors from "constants/colors";

export default function FilterIcon () {
    return (
        <div
            className={'flex items-center justify-center cursor-pointer'}
            style={{
                width: R(71),
                height: R(50),
                paddingLeft: R(20),
                paddingRight: R(20),
                paddingTop: R(15),
                paddingBottom: R(15),
                border: `1px solid ${colors.link_water}`,
                borderRadius: R(12)

            }}>
            <img src="/images/filter.png" alt="" width={'100%'} height={'100%'}/>
        </div>
    )
}