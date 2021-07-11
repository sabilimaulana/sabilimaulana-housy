import BookingCard from "../BookingCard";
import styles from "./HistoryContent.module.css";

const HistoryContent = ({ histories }) => {
  return (
    <div className={styles.container}>
      <div className={styles.historyWrapper}>
        {histories.map((item, index) => {
          return <BookingCard invoice orderDetail={item} key={index} />;
        })}
      </div>
    </div>
  );
};

export default HistoryContent;
