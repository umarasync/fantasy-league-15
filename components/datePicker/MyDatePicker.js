// Packages
import React from "react";
import getYear from "date-fns/getYear";
import DatePicker from "react-datepicker";
import getMonth from "date-fns/getYear";

// Components
import Input from "components/inputs/input";

const MyDatepicker = ({
    dateOfBirth,
    setDateOfBirth
}) => {
    const range = (start, end) => {
        return new Array(end - start).fill().map((d, i) => i + start);
    };
    const years = range(1990, getYear(new Date()));
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
        />
    ));
    CustomInputPicker.displayName = "DatePickerInput";
    return (
        <DatePicker
            renderCustomHeader={({
             date,
             changeYear,
             changeMonth,
             decreaseMonth,
             increaseMonth,
             prevMonthButtonDisabled,
             nextMonthButtonDisabled,
         }) => (
                <div
                    style={{
                        margin: 10,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                        {"<"}
                    </button>
                    <select
                        value={getYear(date)}
                        onChange={({target: {value}}) => changeYear(value)}
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
                </div>
            )}
            selected={dateOfBirth}
            onChange={(date) => setDateOfBirth(date)}
            customInput={<CustomInputPicker/>}
        />
    );
};


export default MyDatepicker