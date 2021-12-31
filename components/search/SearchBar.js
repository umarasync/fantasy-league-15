// Components
import Input from "components/inputs/input";

// Utils
import R from "utils/getResponsiveValue";


export default function SearchBar({
    onSearch
                                  }) {
    return (
        <div className={'relative'}>
            <Input
                placeholder={'Search'}
                onChange={onSearch}
                style={{
                    height: R(50),
                    paddingLeft: R(55),
                    marginBottom: 0
                }}
            />
            <div
                className={'absolute cursor-pointer'}
                style={{
                    width: R(22.83),
                    height: R(22.83),
                    top: R(15),
                    left: R(25),
                }}
                onClick={() => false}
            >
                <img src="/images/search.png" alt="" width={'100%'} height={'100%'} />
            </div>
        </div>
    )
}