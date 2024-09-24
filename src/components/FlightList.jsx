import { useState, useEffect } from "react";
import { TbPlaneDeparture } from "react-icons/tb";
import useFlightStore from "../stores/flightStore";
import useCityStore from "../stores/useCityStore";
import Card from "./Card";
import { ImSpinner2 } from "react-icons/im";

const FlightList = ({ flights: flightsMain, filter, loading }) => {
  const { flights, addFlight, fetchFlights } = useFlightStore();
  const { fetchCityName, cityNames } = useCityStore();

  // Uçuşları ve şehirleri işleme
  useEffect(() => {
    fetchFlights();
    const fetchCities = async () => {
      const uniqueIataCodes = new Set();

      flightsMain.forEach((flight) => {
        const departureIata = flight.route.destinations[0];
        const arrivalIata = flight.route.destinations[1] || "AMS";

        if (departureIata) uniqueIataCodes.add(departureIata);
        if (arrivalIata) uniqueIataCodes.add(arrivalIata);
      });

      const iataCodesArray = Array.from(uniqueIataCodes);

      for (const iataCode of iataCodesArray) {
        if (!cityNames[iataCode]) {
          await fetchCityName(iataCode);
        }
      }
    };

    if (flightsMain && flightsMain.length) {
      fetchCities();
    }
  }, [flightsMain, fetchCityName, cityNames]);

  const calculateDuration = (departureTime, arrivalTime) => {
    const departureDate = new Date(departureTime);
    const arrivalDate = new Date(arrivalTime);
    const durationInMinutes = (arrivalDate - departureDate) / (1000 * 60);
    return durationInMinutes;
  };

  const handleAddFlight = (flight) => {
    const departureDate = new Date(flight.scheduleDateTime);
    const arrivalDate = new Date(flight.estimatedLandingTime);
    const flightDuration = Math.floor(
      (arrivalDate - departureDate) / (1000 * 60)
    );

    const flightData = {
      flightNumber: flight.mainFlight,
      departureTime: departureDate,
      arrivalTime: arrivalDate,
      departureCity: cityNames[flight.route.destinations[0]],
      arrivalCity: cityNames[flight.route.destinations[1]] || "Amsterdam",
      departureAirplane: flight.route.destinations[0],
      arrivalAirplane: flight.route.destinations[1] || "AMS",
      time: flightDuration,
    };

    addFlight(flightData);
  };

  if (!flightsMain) {
    return (
      <div className="flex-1 flex flex-col gap-2 items-center justify-center">
        <TbPlaneDeparture className="size-8 text-black" />
        <b className="text-xl">Not Found</b>
      </div>
    );
  }

  if (loading || Object.keys(cityNames).length === 0) {
    return (
      <div className="flex-1 flex  justify-center">
        <ImSpinner2 className="animate-spin size-8 text-primary h-96" />
      </div>
    );
  }

  return (
    <ul className="space-y-6 w-full">
      {flightsMain.map((flight) => {
        const departureCity =
          cityNames[flight.route.destinations[0]] || "Loading";
        const arrivalCity =
          cityNames[flight.route.destinations[1]] || "Amsterdam";

        const duration = calculateDuration(
          flight.scheduleDateTime,
          flight.estimatedLandingTime
        );
        const hours = Math.floor(duration / 60);
        const minutes = Math.floor(duration % 60);

        const formattedDuration = `${hours}h ${minutes}m`;

        const isBooked = flights.some(
          (myFlight) => myFlight.flightNumber === flight.mainFlight
        );

        return (
          <li key={flight.id}>
            <Card
              flightName={flight.mainFlight}
              time={formattedDuration}
              departureTime={flight.scheduleDateTime}
              arrivalTime={flight.estimatedLandingTime}
              departureCity={departureCity}
              arrivalCity={arrivalCity}
              departureAirplane={flight.route.destinations[0]}
              arrivalAirplane={flight.route.destinations[1] || "AMS"}
              terminal={flight.terminal}
              handleReservation={() => handleAddFlight(flight)}
              isBooked={isBooked}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default FlightList;
