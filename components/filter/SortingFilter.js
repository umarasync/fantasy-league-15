// Components
import FilterDropDown from "components/dropdowns/FilterDropDown";


export default function SortingFilter ({
    options,
    setValue
}) {
    return ( <FilterDropDown initialValue={options[0].name} options={options} setValue={setValue} /> )
}