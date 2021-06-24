import styles from "./HouseContent.module.css";

import bathroomIcon from "../../assets/images/bathroom-icon.svg";
import bedroomIcon from "../../assets/images/bedroom-icon.svg";

import houseOne from "../../assets/images/houses/house-1.svg";
import houseTwo from "../../assets/images/houses/house-2.svg";
import houseThree from "../../assets/images/houses/house-3.svg";
import houseFour from "../../assets/images/houses/house-4.svg";
import { Link } from "react-router-dom";

const HouseContent = ({ house }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <div className={styles.firstImageWrapper}>
          <img className={styles.firstImage} src={house.image} alt="first" />
        </div>

        <div className={styles.secondImageWrapper}>
          <img className={styles.secondImage} src={houseTwo} alt="first" />
        </div>

        <div className={styles.thirdImageWrapper}>
          <img className={styles.thirdImage} src={houseThree} alt="first" />
        </div>

        <div className={styles.fourthImageWrapper}>
          <img className={styles.fourthImage} src={houseFour} alt="first" />
        </div>

        <div className={styles.secondImage}></div>
        <div className={styles.thirdImage}></div>
        <div className={styles.fourthImage}></div>
      </div>
      <div className={styles.houseContentWrapper}>
        <h1 className={styles.name}>{`House ${house.name}`}</h1>
        <div className={styles.subtitle}>
          <div className={styles.subtitleLeft}>
            <h3
              className={styles.price}
            >{`Rp. ${house.price.year.value} / Year`}</h3>
            <p className={styles.address}>
              {house.address}
              {/* Jl. Elang IV Perum Permata Bintaro Residence, Pondok Aren,
              Tangerang Selatan */}
            </p>
          </div>
          <div className={styles.subtitleRight}>
            <div className={styles.spec}>
              <p className={styles.specTitle}>Bedrooms</p>
              <div className={styles.specWrapper}>
                <p className={styles.specText}>{house.spec.bedroom}</p>
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
                <p className={styles.specText}>{house.spec.bathroom}</p>

                <img
                  className={styles.specIcon}
                  src={bathroomIcon}
                  alt="bathroom icon"
                />
              </div>
            </div>

            <div className={styles.spec}>
              <p className={styles.specTitle}>Area</p>
              <p>{`${house.spec.sqft}  ft`}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.descriptionWrapper}>
        <h3 className={styles.descTitle}>Description</h3>
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          fuga consequatur atque vero pariatur placeat, deleniti excepturi quasi
          impedit perspiciatis velit iure quos dolor numquam voluptatibus qui
          dicta. Laboriosam, soluta! Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Non asperiores amet autem impedit, vero iure rem
          corrupti neque aliquam quaerat recusandae necessitatibus. Quo,
          laboriosam cumque quos deleniti dolor odio optio.
        </p>
      </div>

      <div className={styles.book}>
        <Link to="/" className={styles.booknow}>
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default HouseContent;
