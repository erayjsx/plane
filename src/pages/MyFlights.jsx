import React, { useEffect, useState } from "react";
import useFlightStore from "../stores/flightStore";
import useAuthStore from "../stores/authStore";
import { Navigate } from "react-router-dom";
import Card from "../components/Card";

const MyFlights = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const { flights, fetchFlights, deleteFlight, loading, error } =
    useFlightStore();

  useEffect(() => {
    fetchFlights();
  }, [fetchFlights]);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  console.log(flights);

  return (
    <main className="max-w-2xl border rounded-2xl pb-8 mb-8 w-full flex-col flex px-8 mx-auto">
      <div className="h-20 flex items-center justify-center w-full">
        <h2 className="text-2xl">Saved flights</h2>
      </div>
      <ul className="space-y-4">
        {flights &&
          flights.map((flight, index) => {
            return (
              <li key={index}>
                <Card
                  flightName={flight.flightNumber}
                  departureTime={flight.departureTime}
                  arrivalTime={flight.arrivalTime}
                  departureCity={flight.departureCity}
                  arrivalCity={flight.arrivalCity}
                  departureAirplane={flight.departureAirplane}
                  arrivalAirplane={flight.arrivalAirplane}
                  time={flight.time}
                  deleteFlight={() => deleteFlight(flight._id)}
                />
              </li>
            );
          })}
      </ul>
    </main>
  );
};

export default MyFlights;
