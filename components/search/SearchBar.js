// Components
import Input from "components/inputs/input";

// Utils
import R from "utils/getResponsiveValue";

// Styles
const getStyles = (R) => {
    return {
        container: {
            height: R(50),
            paddingLeft: R(55),
            marginBottom: 0
        },
        image: {
            width: R(22.83),
            height: R(22.83),
            top: R(15),
            left: R(25),
        }
    }
}

export default function SearchBar({
    onSearch
}) {

    const STYLES =  { ... getStyles(R) }

    return (
        <div className={'relative'}>
            <Input placeholder={'Search'} onChange={onSearch} style={STYLES.container}/>
            <div className={'absolute cursor-pointer'} style={STYLES.image} onClick={() => false}>
                <img src="/images/search.png" alt="" width={'100%'} height={'100%'} />
            </div>
        </div>
    )
}