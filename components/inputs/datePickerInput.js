// Packages
import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getYear";

// Utils
import R from "utils/getResponsiveValue";

// Constants
import colors from "constants/colors";

// Styles
const getStyles = (R) => {
  return {
    input: {
      marginBottom: R(32),
      borderRadius: R(12),
      paddingLeft: R(24),
      paddingRight: R(24),
      border: "1px solid",
      borderColor: colors.link_water,
      height: R(70),
      fontSize: R(18),
    },
    icon: {
      top: R(28),
      right: R(30),
    },
  };
};
export default function DatePickerInput({
  name,
  id,
  placeholder,
  onChange = () => false,
  onFocus = () => false,
  type = "text",
  icon,
  style,
  onIconClick = () => false,
  onClick = () => false,
  classes,
  value,
  onKeyDown = () => false,
}) {
  const STYLES = { ...getStyles(R) };
  const ref = React.createRef();

  const [focused, setFocused] = useState(false);
  const handleOnFocus = () => {
    onFocus(true);
    setFocused(true);
  };
  const onBlur = () => setFocused(false);

  const handleOnChange = (e) => {
    const valueI = e.target.value;
    onChange(valueI);
  };

  const handleOnIconClick = () => onIconClick();
  const handleOnClick = () => onClick();

  const [startDate, setStartDate] = useState("");
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

  //   const ExampleCustomInput = forwardRef(({ value, handleOnClick }, ref) => (
  //     <input
  //       placeholder={placeholder}
  //       type={type}
  //       name={name}
  //       id={id}
  //       ref={ref}
  //       onClick={handleOnClick}
  //       onFocus={handleOnFocus}
  //       onBlur={onBlur}
  //       onChange={handleOnChange}
  //       onKeyDown={onKeyDown}
  //       value={value}
  //       style={{ ...STYLES.input, ...style }}
  //       className={`w-[100%] font-[600] ${classes}`}
  //     />
  //   ));

  return (
    <div className="relative w-full">
      {focused && (
        <p className="input-focused text-black_rock">{placeholder}</p>
      )}
      {value && !focused && (
        <p className="input-focused text-regent_grey">{placeholder}</p>
      )}
      {icon && (
        <img
          src={`/images/${icon}`}
          onClick={handleOnIconClick}
          alt=""
          className="cursor-pointer absolute"
          style={STYLES.icon}
        />
      )}

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
              onChange={({ target: { value } }) => changeYear(value)}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) =>
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
        selected={startDate}
        onChange={(date) => setDateOfBirth(date)}
        placeholderText="Select Date of birth"
        style={{ ...STYLES.input, ...style }}
        className={`w-[100%] font-[600] ${classes}`}
        // customInput={<ExampleCustomInput />}
      />
    </div>
  );
}
