import BookingCard from "../BookingCard";
import styles from "./ActionModal.module.css";

const ActionModal = ({ showModal, onHide }) => {
  return (
    showModal && (
      <>
        <div className={styles.actionModal}>
          <BookingCard marginBottom={false} />
          <div className={styles.actionWrapper}>
            <button className={styles.cancel}>Cancel</button>
            <button className={styles.approve}>Approve</button>
          </div>
        </div>
        <div className={styles.background} onClick={onHide}></div>
      </>
    )
  );
};

export default ActionModal;
