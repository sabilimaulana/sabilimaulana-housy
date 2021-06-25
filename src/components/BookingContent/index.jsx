import BookingCard from "../BookingCard";
import styles from "./BookingContent.module.css";

const BookingContent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.bookingWrapper}>
        <BookingCard button />
        <BookingCard button />
      </div>
    </div>
  );
};

export default BookingContent;
