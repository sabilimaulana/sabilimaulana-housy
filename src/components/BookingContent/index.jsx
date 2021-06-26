import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import BookingCard from "../BookingCard";
import styles from "./BookingContent.module.css";

const BookingContent = () => {
  const { state } = useContext(UserContext);
  const { user } = state;

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
        {user.booking.map((booking, index) => {
          return (
            <BookingCard
              button
              key={index}
              orderDay={convertDayToString(
                new Date(booking.orderTime).getDay()
              )}
              orderDate={new Date(booking.orderTime).getDate()}
              orderMonth={convertMonthToString(
                new Date(booking.orderTime).getMonth()
              )}
              orderYear={new Date(booking.orderTime).getFullYear()}
              houseName={booking.house.name}
              checkinDate={new Date(booking.checkinDate).getDate()}
              checkinMonth={convertMonthToString(
                new Date(booking.checkinDate).getMonth()
              )}
              checkinYear={new Date(booking.checkinDate).getFullYear()}
              checkoutDate={new Date(booking.checkoutDate).getDate()}
              checkoutMonth={convertMonthToString(
                new Date(booking.checkoutDate).getMonth()
              )}
              checkoutYear={new Date(booking.checkoutDate).getFullYear()}
              duration={booking.orderDuration}
              furnished={booking.house.amenities[0].value}
              petAllowed={booking.house.amenities[1].value}
              sharedAccomodation={booking.house.amenities[2].value}
              address={booking.house.address}
              tenantName={booking.user.username}
              tenantPhone={booking.user.phone}
              tenantGender={booking.user.gender}
              price={booking.price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BookingContent;
