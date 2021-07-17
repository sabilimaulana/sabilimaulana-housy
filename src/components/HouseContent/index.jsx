import styles from "./HouseContent.module.css";

import bathroomIcon from "../../assets/images/bathroom-icon.svg";
import bedroomIcon from "../../assets/images/bedroom-icon.svg";
import houseIcon from "../../assets/images/house-icon.png";

import OrderModal from "../OrderModal";
import { useState } from "react";
import { useContext } from "react";
import FilterContext from "../../contexts/FilterContext";
import { UserContext } from "../../contexts/UserContext";
import { convertToRupiah } from "../../utils/moneyConvert";

const HouseContent = ({ house }) => {
  const [orderModalShow, setOrderModalShow] = useState(false);
  const { filterState } = useContext(FilterContext);
  const { state } = useContext(UserContext);

  let price = "";

  if (filterState.filter.duration === "Day") {
    price = house.dayPrice;
  } else if (filterState.filter.duration === "Month") {
    price = house.monthPrice;
  } else {
    price = house.yearPrice;
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <div className={styles.firstImageWrapper}>
          <img
            className={styles.firstImage}
            src={house.urlFirstImage ? house.urlFirstImage : houseIcon}
            alt="first"
          />
        </div>

        <div className={styles.secondImageWrapper}>
          <img
            className={styles.secondImage}
            src={house.urlSecondImage ? house.urlSecondImage : houseIcon}
            alt="second"
          />
        </div>

        <div className={styles.thirdImageWrapper}>
          <img
            className={styles.thirdImage}
            src={house.urlThirdImage ? house.urlThirdImage : houseIcon}
            alt="third"
          />
        </div>

        <div className={styles.fourthImageWrapper}>
          <img
            className={styles.fourthImage}
            src={house.urlForthImage ? house.urlForthImage : houseIcon}
            alt="fourth"
          />
        </div>

        <div className={styles.secondImage}></div>
        <div className={styles.thirdImage}></div>
        <div className={styles.fourthImage}></div>
      </div>
      <div className={styles.houseContentWrapper}>
        <h1 className={styles.name}>{`House ${house.propertyName}`}</h1>
        <div className={styles.subtitle}>
          <div className={styles.subtitleLeft}>
            <h3 className={styles.price}>{`${convertToRupiah(price)} / ${
              filterState.filter.duration
            }`}</h3>

            <p className={styles.address}>
              {`${house.address}, ${house.City.cityName}.`}
              {/* Jl. Elang IV Perum Permata Bintaro Residence, Pondok Aren,
              Tangerang Selatan */}
            </p>
          </div>
          <div className={styles.subtitleCenter}>
            <p>Amenities</p>
            <div className={styles.amenitiesWrapper}>
              {house.furnished === "true" && <p>Furnished</p>}
              {house.petAllowed === "true" && <p>Pet Allowed</p>}

              {house.sharedAccomodation === "true" && (
                <p>Shared Accomodation</p>
              )}
            </div>
          </div>
          <div className={styles.subtitleRight}>
            <div className={styles.spec}>
              <p className={styles.specTitle}>Bedrooms</p>
              <div className={styles.specWrapper}>
                <p className={styles.specText}>{house.bedroom}</p>
                <img
                  className={styles.specIcon}
                  src={bedroomIcon}
                  alt="bedroom icon"
                />
              </div>
            </div>

            <div className={styles.spec}>
              <p className={styles.specTitle}>Bathrooms</p>
              <div className={styles.specWrapper}>
                <p className={styles.specText}>{house.bathroom}</p>

                <img
                  className={styles.specIcon}
                  src={bathroomIcon}
                  alt="bathroom icon"
                />
              </div>
            </div>

            <div className={styles.spec}>
              <p className={styles.specTitle}>Area</p>
              <p>{`${house.area}  ft`}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.descriptionWrapper}>
        <h3 className={styles.descTitle}>Description</h3>
        <p className={styles.desc}>{house.description}</p>
      </div>

      <div className={styles.book}>
        {state.user.fullname === undefined || state.user.fullname === "" ? (
          <button className={styles.bookguest}>Book Now</button>
        ) : (
          <button
            className={styles.booknow}
            onClick={() => {
              setOrderModalShow(true);
            }}
          >
            Book Now
          </button>
        )}
      </div>
      <OrderModal
        house={house}
        showModal={orderModalShow}
        onHide={() => {
          setOrderModalShow(false);
        }}
        duration={filterState.filter.duration}
        price={price}
      />
    </div>
  );
};

export default HouseContent;
