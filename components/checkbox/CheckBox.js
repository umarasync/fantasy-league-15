// Packages
import Checkbox from "react-custom-checkbox";

// Constants
import colors from "constants/colors";

// Utils
import R from "utils/getResponsiveValue";

// Styles
const getStyles = (R) => {
    return {
    }
}

export default function CheckBox({
     checked
 }) {
    const STYLES =  { ... getStyles(R) }

    return (
        <div className={'cursor-pointer'}>
            <Checkbox
                checked={checked}
                icon={<img src="/images/filled_checkbox.png" alt=""/>}
                borderColor={checked ? 'transparent' : colors.link_water}
                size={R(24)}
                containerStyle={{ cursor: "pointer" }}
            />
        </div>
    )
}