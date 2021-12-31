
// Utils
import R from "utils/getResponsiveValue";

export default function Border({
    style
}) {
    return (
        <p className="grey-faded-2 text-white" style={{height: R(60), ...style }}/>
    )
}