import { useEffect, useState } from "react";
import BookingCard from "../BookingCard";
import styles from "./HistoryContent.module.css";
import axios from "axios";

const HistoryContent = () => {
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    const getHistories = async () => {
      try {
        const token = sessionStorage.getItem("token");

        const result = await axios({
          method: "GET",
          url: "http://localhost:8080/api/v1/transactions/history",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setHistories(result.data.data.reverse());
      } catch (error) {
        console.log(error.data);
      }
    };

    getHistories();
  }, []);
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
