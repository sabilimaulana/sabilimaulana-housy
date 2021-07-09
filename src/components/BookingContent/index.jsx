import BookingCard from "../BookingCard";
import styles from "./BookingContent.module.css";

const BookingContent = ({ order }) => {
  const convertDayToString = (number) => {
    const day = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    return day[number];
  };

  const convertMonthToString = (number) => {
    const month = [
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
      "Desember",
    ];

    return month[number];
  };

  // console.log(convertDayToString(1));

  return (
    <div className={styles.container}>
      <div className={styles.bookingWrapper}>
        {order.map((order, index) => {
          // console.log(new Date(order.checkin));
          return (
            <BookingCard
              button
              key={index}
              orderDay={convertDayToString(new Date(order.createdAt).getDay())}
              orderDate={new Date(order.createdAt).getDate()}
              orderMonth={convertMonthToString(
                new Date(order.createdAt).getMonth()
              )}
              orderYear={new Date(order.createdAt).getFullYear()}
              houseName={order.Property.propertyName}
              checkinDate={new Date(order.checkin).getDate()}
              checkinMonth={convertMonthToString(
                new Date(order.checkin).getMonth()
              )}
              checkinYear={new Date(order.checkin).getFullYear()}
              checkoutDate={new Date(order.checkout).getDate()}
              checkoutMonth={convertMonthToString(
                new Date(order.checkout).getMonth()
              )}
              checkoutYear={new Date(order.checkout).getFullYear()}
              orderDetail={order}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BookingContent;
