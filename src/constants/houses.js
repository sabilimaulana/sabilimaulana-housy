import houseOne from "../assets/images/houses/house-1.svg";
import houseTwo from "../assets/images/houses/house-2.svg";
import houseThree from "../assets/images/houses/house-3.svg";
import houseFour from "../assets/images/houses/house-4.svg";
import houseFive from "../assets/images/houses/house-5.svg";
import houseSix from "../assets/images/houses/house-6.svg";
import houseSeven from "../assets/images/houses/house-7.svg";
import houseEight from "../assets/images/houses/house-8.svg";
import houseNine from "../assets/images/houses/house-9.svg";

export const houses = [
  {
    image: houseOne,
    spec: {
      bedroom: 3,
      bathroom: 2,
      sqft: "1,800",
    },

    address: "Tangerang Selatan, Pondok Aren",
    amenities: [
      {
        title: "Furnished",
        value: true,
      },
      {
        title: "Pet Allowed",
        value: true,
      },
      {
        title: "Shared Accomodation",
        value: true,
      },
    ],
    price: {
      day: {
        title: "Day",
        value: "25.000",
      },
      month: {
        title: "Month",
        value: "750.000",
      },
      year: {
        title: "Year",
        value: "9.000.000",
      },
    },
  },
  {
    image: houseTwo,
    spec: {
      bedroom: 2,
      bathroom: 1,
      sqft: "1,800",
    },
    address: "Bogor",
    amenities: [
      {
        title: "Furnished",
        value: true,
      },
      {
        title: "Pet Allowed",
        value: false,
      },
      {
        title: "Shared Accomodation",
        value: true,
      },
    ],
    price: {
      day: {
        title: "Day",
        value: "25.000",
      },
      month: {
        title: "Month",
        value: "750.000",
      },
      year: {
        title: "Year",
        value: "9.000.000",
      },
    },
  },
  {
    image: houseThree,
    spec: {
      bedroom: 2,
      bathroom: 2,
      sqft: "2,400",
    },
    address: "Jakarta Barat, Tambora",
    amenities: [
      {
        title: "Furnished",
        value: false,
      },
      {
        title: "Pet Allowed",
        value: true,
      },
      {
        title: "Shared Accomodation",
        value: false,
      },
    ],
    price: {
      day: {
        title: "Day",
        value: "25.000",
      },
      month: {
        title: "Month",
        value: "750.000",
      },
      year: {
        title: "Year",
        value: "9.000.000",
      },
    },
  },
  {
    image: houseFour,
    spec: {
      bedroom: 3,
      bathroom: 2,
      sqft: "1,800",
    },

    address: "Tangerang",
    amenities: [
      {
        title: "Furnished",
        value: false,
      },
      {
        title: "Pet Allowed",
        value: true,
      },
      {
        title: "Shared Accomodation",
        value: true,
      },
    ],
    price: {
      day: {
        title: "Day",
        value: "25.000",
      },
      month: {
        title: "Month",
        value: "750.000",
      },
      year: {
        title: "Year",
        value: "9.000.000",
      },
    },
  },
  {
    image: houseFive,
    spec: {
      bedroom: 2,
      bathroom: 1,
      sqft: "1,800",
    },
    address: "Jakarta Utara, Pluit",
    amenities: [
      {
        title: "Furnished",
        value: true,
      },
      {
        title: "Pet Allowed",
        value: false,
      },
      {
        title: "Shared Accomodation",
        value: true,
      },
    ],
    price: {
      day: {
        title: "Day",
        value: "25.000",
      },
      month: {
        title: "Month",
        value: "750.000",
      },
      year: {
        title: "Year",
        value: "9.000.000",
      },
    },
  },
  {
    image: houseSix,
    spec: {
      bedroom: 2,
      bathroom: 2,
      sqft: "2,400",
    },
    address: "Jakarta Selatan, Kemang",
    amenities: [
      {
        title: "Furnished",
        value: false,
      },
      {
        title: "Pet Allowed",
        value: true,
      },
      {
        title: "Shared Accomodation",
        value: true,
      },
    ],
    price: {
      day: {
        title: "Day",
        value: "25.000",
      },
      month: {
        title: "Month",
        value: "750.000",
      },
      year: {
        title: "Year",
        value: "9.000.000",
      },
    },
  },
  {
    image: houseSeven,
    spec: {
      bedroom: 2,
      bathroom: 1,
      sqft: "1,800",
    },
    address: "Jakarta Timur, Kampung Melayu",
    amenities: [
      {
        title: "Furnished",
        value: false,
      },
      {
        title: "Pet Allowed",
        value: false,
      },
      {
        title: "Shared Accomodation",
        value: true,
      },
    ],
    price: {
      day: {
        title: "Day",
        value: "25.000",
      },
      month: {
        title: "Month",
        value: "750.000",
      },
      year: {
        title: "Year",
        value: "9.000.000",
      },
    },
  },
  {
    image: houseEight,
    spec: {
      bedroom: 2,
      bathroom: 2,
      sqft: "2,400",
    },
    address: "Jakarta Pusat, Kemayoran",
    amenities: [
      {
        title: "Furnished",
        value: true,
      },
      {
        title: "Pet Allowed",
        value: false,
      },
      {
        title: "Shared Accomodation",
        value: false,
      },
    ],
    price: {
      day: {
        title: "Day",
        value: "25.000",
      },
      month: {
        title: "Month",
        value: "750.000",
      },
      year: {
        title: "Year",
        value: "9.000.000",
      },
    },
  },
  {
    image: houseNine,
    spec: {
      bedroom: 3,
      bathroom: 2,
      sqft: "1,800",
    },

    address: "Bekasi",
    amenities: [
      {
        title: "Furnished",
        value: true,
      },
      {
        title: "Pet Allowed",
        value: true,
      },
      {
        title: "Shared Accomodation",
        value: false,
      },
    ],
    price: {
      day: {
        title: "Day",
        value: "25.000",
      },
      month: {
        title: "Month",
        value: "750.000",
      },
      year: {
        title: "Year",
        value: "9.000.000",
      },
    },
  },
  {
    image: houseFive,
    spec: {
      bedroom: 2,
      bathroom: 1,
      sqft: "1,800",
    },
    address: "Jakarta Selatan, Pondok Indah",
    amenities: [
      {
        title: "Furnished",
        value: true,
      },
      {
        title: "Pet Allowed",
        value: true,
      },
      {
        title: "Shared Accomodation",
        value: true,
      },
    ],
    price: {
      day: {
        title: "Day",
        value: "25.000",
      },
      month: {
        title: "Month",
        value: "750.000",
      },
      year: {
        title: "Year",
        value: "9.000.000",
      },
    },
  },
  {
    image: houseSeven,
    spec: {
      bedroom: 2,
      bathroom: 1,
      sqft: "1,800",
    },
    address: "Tangerang Selatan, Pondok Aren",
    amenities: [
      {
        title: "Furnished",
        value: false,
      },
      {
        title: "Pet Allowed",
        value: false,
      },
      {
        title: "Shared Accomodation",
        value: true,
      },
    ],
    price: {
      day: {
        title: "Day",
        value: "25.000",
      },
      month: {
        title: "Month",
        value: "750.000",
      },
      year: {
        title: "Year",
        value: "9.000.000",
      },
    },
  },
];
