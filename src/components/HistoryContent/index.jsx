import BookingCard from "../BookingCard";
import styles from "./HistoryContent.module.css";

const HistoryContent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.historyWrapper}>
        <BookingCard status="Approve" invoice />
        <BookingCard status="Cancel" />
        <BookingCard />
      </div>
    </div>
  );
};

export default HistoryContent;
