import { Link } from "react-router-dom";

const AdSection = () => {
  return (
    <div className="p-6 flex flex-col w-72 space-y-6">
      <Link
        to="/"
        className="bg-[url('https://cdn.pixabay.com/photo/2017/12/28/23/41/car-3046424_1280.jpg')] overflow-hidden bg-no-repeat bg-center bg-cover text-white text-xl shadow-sm rounded-2xl h-60 w-72"
      >
        <div className="flex-1 flex items-end p-6 bg-gradient-to-t from-black to-transparent h-full">
          <b>Car Rentals</b>
        </div>
      </Link>

      <Link
        to="/"
        className="bg-[url('https://cdn.pixabay.com/photo/2021/12/11/07/59/hotel-6862159_1280.jpg')] overflow-hidden bg-no-repeat bg-center bg-cover text-white text-xl shadow-sm rounded-2xl h-60 w-72"
      >
        <div className="flex-1 flex items-end p-6 bg-gradient-to-t from-black to-transparent h-full">
          <b>Hotels</b>
        </div>
      </Link>

      <Link
        to="/"
        className="bg-[url('https://cdn.pixabay.com/photo/2017/02/18/08/46/journey-2076817_1280.jpg')] overflow-hidden bg-no-repeat bg-center bg-cover text-white text-xl shadow-sm rounded-2xl h-60 w-72"
      >
        <div className="flex-1 flex items-end p-6 bg-gradient-to-t from-black to-transparent h-full">
          <b>Travel Packages</b>
        </div>
      </Link>
    </div>
  );
};

export default AdSection;
