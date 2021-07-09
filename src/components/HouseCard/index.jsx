import { Link } from "react-router-dom";
import AmenityCard from "../AmenityCard";
import styles from "./HouseCard.module.css";
import houseIcon from "../../assets/images/house-icon.png";

const HouseCard = ({ id, price, houseSpec, houseAddress, house }) => {
  return (
    <Link to={`/house-detail/${id}`} className={styles.link}>
      <div className={styles.houseCard}>
        <img
          className={styles.houseImg}
          src={house.urlFirstImage ? house.urlFirstImage : houseIcon}
          alt="house"
          width="270px"
        />
        <p className={styles.housePrice}>{price}</p>
        <p className={styles.houseSpec}>{houseSpec}</p>
        <p className={styles.houseAddress}>{houseAddress}</p>
        <div className={styles.amenities}>
          {house.furnished === "true" && <AmenityCard amenity="Furnished" />}
          {house.petAllowed === "true" && <AmenityCard amenity="Pet Allowed" />}
          {house.sharedAccomodation === "true" && (
            <AmenityCard amenity="Shared Accomodation" />
          )}

          {/* {amenities.map((amenity, index) => {
            return (
              amenity.value && (
                <AmenityCard key={index} amenity={amenity.title} />
              )
            );
          })} */}
        </div>
      </div>
    </Link>
  );
};

export default HouseCard;
