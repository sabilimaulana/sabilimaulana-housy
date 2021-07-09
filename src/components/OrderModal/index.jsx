import DatePicker from "react-datepicker";
import axios from "axios";
import { useState, useContext } from "react";

import styles from "./orderModal.module.css";

import calendarIcon from "../../assets/images/calendar-icon.svg";
import verticalLine from "../../assets/images/vertical-line.svg";
import dropdownIcon from "../../assets/images/dropdown-icon.svg";
import { UserContext } from "../../contexts/UserContext";

const OrderModal = ({ showModal, onHide, house, duration, price }) => {
  const [checkinDate, setCheckinDate] = useState();
  const [checkoutDate, setCheckouDate] = useState();
  const { state } = useContext(UserContext);

  const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const handleCheckin = (date) => {
    setCheckinDate(date);
    if (duration === "Day") {
      setCheckouDate(addDays(date, 1));
    } else if (duration === "Month") {
      setCheckouDate(addDays(date, 31));
    } else {
      setCheckouDate(addDays(date, 365));
    }
  };

  const handleCheckout = (date) => {
    setCheckouDate(date);
  };

  const handleOrder = async (e) => {
    e.preventDefault();

    //generate ticket
    // if (!localStorage.getItem("ticket")) {
    //   localStorage.setItem(
    //     "ticket",
    //     JSON.stringify(Array.from(Array(1000).keys()))
    //   );
    // }
    // const ticketLocalStorage = JSON.parse(localStorage.getItem("ticket"));
    // const randomIndex = Math.floor(Math.random() * ticketLocalStorage.length);
    // const randomTicket = ticketLocalStorage[randomIndex];
    // ticketLocalStorage.splice(randomIndex, 1);
    // localStorage.setItem("ticket", JSON.stringify(ticketLocalStorage));
    //sampai sini

    // if (!localStorage.getItem("order")) { pernah aktif
    //   localStorage.setItem("order", JSON.stringify([]));
    // }
    // const orderLocalStorage = JSON.parse(localStorage.getItem("order")); pernah aktif

    try {
      const orderDetail = {
        status: "Waiting Payment",
        duration,
        total: price,
        checkin: checkinDate,
        checkout: checkoutDate,
        propertyId: house.id,
        userId: state.user.id,
        ownerId: house.ownerId,
      };
      console.log(orderDetail);

      await axios.post("http://localhost:8080/api/v1/transaction", orderDetail);
    } catch (error) {
      console.log(error.response);
    }
    // const userBooking = state.user;
    // console.log(userBooking);

    // const userSession = JSON.parse(sessionStorage.getItem("user"));
    // userSession.booking.push(orderDetail);

    // sessionStorage.setItem(
    //   "user",
    //   JSON.stringify({
    //     ...userSession,
    //   })
    // );

    // dispatch({
    //   type: "LOGIN",
    //   payload: {
    //     booking: [orderDetail],
    //   },
    // });

    // orderLocalStorage.push(orderDetail); pernah aktif
    // localStorage.setItem("order", JSON.stringify(orderLocalStorage)); pernah aktif

    onHide();
  };
  // console.log(state.user);

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
            <CheckDate
              checkDate={checkoutDate}
              handleCheck={handleCheckout}
              disabled
            />

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

const CheckDate = ({ checkDate, handleCheck, disabled }) => {
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
        {disabled ? (
          <DatePicker
            className={styles.datePicker}
            placeholderText="Select your date"
            selected={checkDate}
            onChange={handleCheck}
            disabled
          />
        ) : (
          <DatePicker
            className={styles.datePicker}
            placeholderText="Select your date"
            selected={checkDate}
            onChange={handleCheck}
          />
        )}
      </div>
    </div>
  );
};

export default OrderModal;
