import axios from "axios";
import BookingCard from "../BookingCard";
import styles from "./ActionModal.module.css";

const ActionModal = ({ showModal, onHide, orderDetail }) => {
  const handleApprove = async () => {
    try {
      const result = await axios.patch(
        `http://localhost:8080/api/v1/transaction/${orderDetail.id}`,
        { status: "Approved" }
      );
      console.log(result);
    } catch (error) {
      console.log(error.response);
    }

    onHide();
    window.location.reload();
  };

  const handleCancel = async () => {
    try {
      await axios.patch(
        `http://localhost:8080/api/v1/transaction/${orderDetail.id}`,
        { status: "Cancel" }
      );
    } catch (error) {
      console.log(error.response);
    }

    onHide();
    window.location.reload();
  };
  console.log(orderDetail);
  return (
    showModal && (
      <>
        <div className={styles.actionModal}>
          <BookingCard marginBottom={false} orderDetail={orderDetail} />
          <div className={styles.actionWrapper}>
            {orderDetail.status === "Waiting Approve" && (
              <>
                <button className={styles.cancel} onClick={handleCancel}>
                  Cancel
                </button>
                <button className={styles.approve} onClick={handleApprove}>
                  Approve
                </button>
              </>
            )}
          </div>
        </div>
        <div className={styles.background} onClick={onHide}></div>
      </>
    )
  );
};

export default ActionModal;
