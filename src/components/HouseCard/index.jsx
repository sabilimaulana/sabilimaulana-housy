import AmenityCard from "../AmenityCard";
import styles from "./HouseCard.module.css";

const HouseCard = ({
  houseImage,
  price,
  houseSpec,
  houseAddress,
  amenities,
}) => {
  return (
    <div className={styles.houseCard}>
      <img
        className={styles.houseImg}
        src={houseImage}
        alt="house"
        width="270px"
      />
      <p className={styles.housePrice}>{price}</p>
      <p className={styles.houseSpec}>{houseSpec}</p>
      <p className={styles.houseAddress}>{houseAddress}</p>
      <div className={styles.amenities}>
        {amenities.map((amenity, index) => {
          return (
            amenity.value && <AmenityCard key={index} amenity={amenity.title} />
          );
        })}
      </div>
    </div>
  );
};

export default HouseCard;
