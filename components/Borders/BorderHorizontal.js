// Utils
import R from "utils/getResponsiveValue";

export default function BorderHorizontal({
   style
}) {
    return (
        <p className="border-mystic text-white" style={{height: R(1), ...style }}/>
    )
}