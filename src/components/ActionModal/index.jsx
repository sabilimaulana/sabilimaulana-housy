import BookingCard from "../BookingCard";
import styles from "./ActionModal.module.css";

const ActionModal = ({ showModal, onHide, orderDetail, orderIndex }) => {
  const handleApprove = () => {
    const orderLocalStorage = JSON.parse(localStorage.getItem("order"));
    const historyLocalStorage = JSON.parse(localStorage.getItem("history"));
    const item = orderLocalStorage.splice(orderIndex, 1)[0];
    item.status = "Approved";

    historyLocalStorage.push(item);
    // const newOrderLocalStorage = orderLocalStorage.filter((item) => {

    //   if (orderDetail.id === item.id) {
    //     console.log("2");
    //     item.status = "approved";
    //     historyLocalStorage.push(item);
    //     return false;
    //   }
    //   return true;
    // });
    const sliceFront = orderLocalStorage.slice(0, orderIndex);
    const sliceBack = orderLocalStorage.slice(orderIndex + 1);
    const newOrderLocalStorage = [...sliceFront, ...sliceBack];
    localStorage.setItem("order", JSON.stringify(newOrderLocalStorage));
    localStorage.setItem("history", JSON.stringify(historyLocalStorage));
  };
  return (
    showModal && (
      <>
        <div className={styles.actionModal}>
          <BookingCard marginBottom={false} orderDetail={orderDetail} />
          <div className={styles.actionWrapper}>
            <button className={styles.cancel}>Cancel</button>
            <button className={styles.approve} onClick={handleApprove}>
              Approve
            </button>
          </div>
        </div>
        <div className={styles.background} onClick={onHide}></div>
      </>
    )
  );
};

export default ActionModal;
