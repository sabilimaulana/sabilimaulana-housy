import DatePicker from "react-datepicker";
import styles from "./orderModal.module.css";

import calendarIcon from "../../assets/images/calendar-icon.svg";
import verticalLine from "../../assets/images/vertical-line.svg";
import dropdownIcon from "../../assets/images/dropdown-icon.svg";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const OrderModal = ({ showModal, onHide, house, duration, price }) => {
  const [checkinDate, setCheckinDate] = useState();
  const [checkoutDate, setCheckouDate] = useState();
  const { state, dispatch } = useContext(UserContext);

  const handleCheckin = (date) => {
    setCheckinDate(date);
  };

  const handleCheckout = (date) => {
    setCheckouDate(date);
  };

  const handleOrder = (e) => {
    e.preventDefault();

    if (!localStorage.getItem("order")) {
      localStorage.setItem("order", JSON.stringify([]));
    }

    const orderLocalStorage = JSON.parse(localStorage.getItem("order"));
    console.log(orderLocalStorage);

    const orderDetail = {
      idOrder: 1,
      orderDuration: duration,
      price,
      checkinDate,
      checkoutDate,
      house,
      orderTime: new Date(),
      user: {
        id: state.user.id,
        username: state.user.username,
        gender: state.user.gender,
        phone: state.user.phone,
      },
    };

    const userBooking = state.user;
    console.log(userBooking);

    const userSession = JSON.parse(sessionStorage.getItem("user"));
    userSession.booking.push(orderDetail);

    sessionStorage.setItem(
      "user",
      JSON.stringify({
        ...userSession,
      })
    );

    dispatch({
      type: "LOGIN",
      payload: {
        booking: [orderDetail],
      },
    });

    orderLocalStorage.push(orderDetail);

    localStorage.setItem("order", JSON.stringify(orderLocalStorage));

    onHide();
  };
  console.log(state.user);

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
            <CheckDate checkDate={checkinDate} handleCheck={handleCheckin} />

            <label className={styles.inputLabel}>Check-out</label>
            <CheckDate checkDate={checkoutDate} handleCheck={handleCheckout} />

            <input
              type="submit"
              className={styles.orderButton}
              value="Order"
              onClick={handleOrder}
            />
          </form>
        </div>
        <div className={styles.background} onClick={onHide}></div>
      </>
    )
  );
};

const CheckDate = ({ checkDate, handleCheck }) => {
  // const [selectedDate, setSelectedDate] = useState();

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
          selected={checkDate}
          onChange={handleCheck}
        />
      </div>
    </div>
  );
};

export default OrderModal;
