import { useContext, useEffect, useState } from "react";
import ActionModal from "../ActionModal";
import styles from "./OwnerContent.module.css";
import glassIcon from "../../assets/images/glass-icon.svg";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import billIcon from "../../assets/images/bill2-icon.svg";

const OwnerContent = () => {
  const [actionModalShow, setActionModalShow] = useState(false);
  const [orders, setOrders] = useState([]);
  const [focusOrder, setFocusOrder] = useState();

  const { state } = useContext(UserContext);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const result = await axios.get(
          `http://localhost:8080/api/v1/transactions/${state.user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setOrders(result.data.data.reverse());
        // console.log(result.data.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    getOrder();
  }, [state.user.id]);

  // useEffect(() => {
  //   const getUser = async () => {
  //     const token = sessionStorage.getItem("token");
  //     if (token) {
  //       const user = await axios.get(
  //         "http://localhost:8080/api/v1/user/profile",
  //         { headers: { Authorization: `Bearer ${token}` } }
  //       );

  //       dispatch({
  //         type: "LOGIN",
  //         payload: {
  //           user: user.data.data,
  //         },
  //       });
  //     }
  //   };

  //   getUser();
  // }, [dispatch]);
  console.log(orders);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Income Transaction</h1>
      <table className={styles.incomeTable}>
        <thead>
          <tr>
            <th>No</th>
            <th>Users</th>
            <th>Type of Rent</th>
            <th>Bukti Transfer</th>
            <th>Status Payment</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.length > 0 ? (
            orders.map((order, index, array) => {
              return (
                <tr key={index}>
                  <td>{array.length - index}</td>
                  <td>{order.userData.username}</td>
                  <td>{order.duration}</td>
                  <td>
                    <a href={order.attachment}>
                      {/* <img
                        className={styles.attachment}
                        src={order.attachment}
                        alt="attachment"
                      /> */}
                      <img src={billIcon} alt="bill" width="25px" />
                    </a>
                  </td>
                  {order.status === "Waiting Approve" ? (
                    <td className={styles.pending}>Pending</td>
                  ) : order.status === "Approved" ? (
                    <td className={styles.approved}>Approved</td>
                  ) : (
                    order.status === "Cancel" && (
                      <td className={styles.cancel}>Cancel</td>
                    )
                  )}
                  <td
                    onClick={() => {
                      setActionModalShow(true);
                      setFocusOrder(index);
                    }}
                  >
                    <img src={glassIcon} alt="search icon" />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                Belum ada data
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <ActionModal
        showModal={actionModalShow}
        orderDetail={orders[focusOrder]}
        onHide={() => {
          setActionModalShow(false);
        }}
      />
    </div>
  );
};

export default OwnerContent;
