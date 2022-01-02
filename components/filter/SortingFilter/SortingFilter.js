// Components
import FilterDropDown from "components/dropdowns/FilterDropDown";

export default function SortingFilter ({
    options,
    onApplyFilter
}) {
    return ( <FilterDropDown initialValue={options[0].name} options={options} onOptionChange={onApplyFilter} /> )
}