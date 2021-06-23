import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";
import { useState } from "react";
import styles from "./DateInput.module.css";

import calendarIcon from "../../assets/images/calendar-icon.svg";
import verticalLine from "../../assets/images/vertical-line.svg";
import dropdownIcon from "../../assets/images/dropdown-icon.svg";

const DateInput = () => {
  const [selectedDate, setSelectedDate] = useState();
  return (
    <form className={styles.dateForm}>
      <img src={calendarIcon} alt="calendar icon" width="24px" />
      <img
        className={styles.verticalLine}
        src={verticalLine}
        alt="border"
        height="24px"
      />
      <div>
        <DatePicker
          className={styles.datePicker}
          placeholderText="Select your date"
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
          }}
        />
      </div>
      <img
        className={styles.dropdownIcon}
        src={dropdownIcon}
        alt="dropdown icon"
        width="24px"
      />
    </form>
  );
};

export default DateInput;
