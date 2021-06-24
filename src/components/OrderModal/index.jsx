import DatePicker from "react-datepicker";
import DateInput from "../DateInput";
import styles from "./orderModal.module.css";

import calendarIcon from "../../assets/images/calendar-icon.svg";
import verticalLine from "../../assets/images/vertical-line.svg";
import dropdownIcon from "../../assets/images/dropdown-icon.svg";
import { useState } from "react";

const OrderModal = ({ showModal, onHide }) => {
  return (
    showModal && (
      <>
        <div className={styles.orderModal}>
          <form className={styles.orderForm}>
            <div className={styles.centerWrapper}>
              <p className={styles.modalTitle}>How long you will stay?</p>
            </div>

            {/* date input */}

            <label className={styles.inputLabel}>Check-in</label>
            <CheckDate />

            <label className={styles.inputLabel}>Check-out</label>
            <CheckDate />

            <input type="submit" className={styles.orderButton} value="Order" />
          </form>
        </div>
        <div className={styles.background} onClick={onHide}></div>
      </>
    )
  );
};

const CheckDate = () => {
  const [selectedDate, setSelectedDate] = useState();

  return (
    <div className={styles.dateForm}>
      <img src={calendarIcon} alt="calendar icon" width="24px" />
      <img
        className={styles.verticalLine}
        src={verticalLine}
        alt="border"
        height="24px"
      />
      <img
        className={styles.dropdownIcon}
        src={dropdownIcon}
        alt="dropdown icon"
        width="24px"
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
    </div>
  );
};

export default OrderModal;
