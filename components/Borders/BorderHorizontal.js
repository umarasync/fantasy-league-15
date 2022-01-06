// Utils
import R from "utils/getResponsiveValue";

export default function BorderHorizontal({
   style
}) {
    return (
        <p className="grey-faded-3 text-white" style={{height: R(1), ...style }}/>
    )
}