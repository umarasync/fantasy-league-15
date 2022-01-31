// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import Image from "components/html/Image";

// Constants
import colors from "constants/colors";
import BorderHorizontal from "components/Borders/BorderHorizontal";

// Utils
import R from "utils/getResponsiveValue";

// Styles
const getStyles = (R) => {
    return {
        container: {
            width: '100%'
        }

    }
}
export default function HeadToHead({
     match,
     containerRef
 }) {

    const STYLES = {...getStyles(R)}

    const {matchDetails} = match

    const { headToHead } = matchDetails
    return (
        <div ref={containerRef} style={STYLES.container}>
            <p>Hello wrold</p>
        </div>
    )
}