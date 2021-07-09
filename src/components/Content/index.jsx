import styles from "./Content.module.css";
import HouseCard from "../HouseCard";
import { convertToRupiah } from "../../utils/moneyConvert";

const Content = ({ houses, housesDuration }) => {
  let priceDuration = "";

  if (houses.length > 0) {
    return (
      <div className={styles.content}>
        {houses.map((house, index) => {
          switch (housesDuration) {
            case "Day":
              priceDuration = house.dayPrice;
              break;
            case "Month":
              priceDuration = house.monthPrice;
              break;
            default:
              priceDuration = house.yearPrice;
          }

          return (
            <HouseCard
              key={index}
              id={house.id}
              price={`${convertToRupiah(priceDuration)} / ${housesDuration}`}
              houseSpec={`${house.bedroom} Beds, ${house.bathroom} Baths, ${house.area} sqft`}
              houseAddress={house.address}
              house={house}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <div className={styles.content}>
        <div>empty</div>
      </div>
    );
  }
};

export default Content;
