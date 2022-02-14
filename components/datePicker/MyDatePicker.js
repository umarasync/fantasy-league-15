// Packages
import React from "react";
import DatePicker from "react-datepicker";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import range from "lodash/range";
import "react-datepicker/dist/react-datepicker.css";

// Components
import Input from "components/inputs/input";
import Div from "components/html/Div";

// Utils
import R from "utils/getResponsiveValue";

// Constants
import colors from "constants/colors";

// Styles
const getStyles = (R) => {
    return {
        select: {
            background: colors.gallery,
            cursor: 'pointer'
        }
    }
}

const MyDatepicker = ({
  dateOfBirth,
  setDateOfBirth
}) => {

    const STYLES = {...getStyles(R)}
    const years = range(1990, getYear(new Date()) + 1, 1);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const CustomInputPicker = React.forwardRef(({value, onClick}, ref) => (
        <Input
            value={value}
            name="dateOfBirth"
            id="dateOfBirth"
            placeholder="Date of birth"
            onClick={onClick}
            ref={ref}
            mb={0}
            autoCompleteOff
        />
    ));

    CustomInputPicker.displayName = "DatePickerInput";

    return (
        <DatePicker
            renderCustomHeader={(props) => {

                const {
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                } = props

                return (
                    <Div className={'flex items-center justify-between'} pl={10} pr={10} pb={10}>
                        <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                            {"<"}
                        </button>
                        <select
                            value={getYear(date)}
                            onChange={({target: {value}}) => changeYear(value)}
                            style={STYLES.select}
                        >
                            {years.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <select
                            value={months[getMonth(date)]}
                            onChange={({target: {value}}) =>
                                changeMonth(months.indexOf(value))
                            }
                            style={STYLES.select}
                        >
                            {months.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                            {">"}
                        </button>
                    </Div>
                )
            }}
            selected={dateOfBirth}
            onChange={(date) => setDateOfBirth(date)}
            customInput={<CustomInputPicker/>}
        />
    );
};


export default MyDatepicker