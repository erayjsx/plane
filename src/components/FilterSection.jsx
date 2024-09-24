import { useEffect } from "react";
import useAirlineStore from "../stores/airlineStore";
import Slot from "./Slot";
import { useState } from "react";

const FilterSection = ({
  sort,
  onSortChange,
  timeFilters = [],
  selectedTimes,
  onTimeChange,
  stopFilters = [],
  selectedStops,
  onStopChange,
  airlineFilters = [],
  selectedAirline,
  onAirlineChange,
  onClearFilters,
}) => {
  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    onSortChange(selectedSort);
  };

  return (
    <div className="max-w-xs sticky top-0 p-6 *:flex *:gap-2 flex flex-col space-y-6 *:flex-col w-full">
      <label>
        <b>Sort By:</b>
        <select
          className="cursor-pointer p-2"
          value={sort}
          onChange={handleSortChange}
        >
          <option value="flightName">Flight Name (Ascending)</option>
          <option value="-flightName">Flight Name (Descending)</option>
          <option value="scheduleDate">Schedule Date (Ascending)</option>
          <option value="-scheduleDate">Schedule Date (Descending)</option>
          <option value="scheduleTime">Schedule Time (Ascending)</option>
          <option value="-scheduleTime">Schedule Time (Descending)</option>
        </select>
      </label>

      <label>
        <b>Arrival Time:</b>
        <ul className="space-y-2">
          {timeFilters.map((time, index) => (
            <li key={index}>
              <Slot
                checked={selectedTimes.includes(time.value)}
                onChange={() => onTimeChange(time.value)}
                labelText={time.label}
              />
            </li>
          ))}
        </ul>
      </label>

      <label>
        <b>Stops:</b>
        <ul className="space-y-2">
          {stopFilters.map((stop, index) => (
            <li key={index}>
              <Slot
                checked={selectedStops.includes(stop.value)}
                onChange={() => onStopChange(stop.value)}
                labelText={stop.label}
              />
            </li>
          ))}
        </ul>
      </label>

      <label>
        <b>Airlines Included:</b>
        <ul className="space-y-2">
          {airlineFilters.map((airline, index) => (
            <li key={index}>
              <Slot
                checked={selectedAirline === airline.icao}
                onChange={() => onAirlineChange(airline.icao)}
                labelText={airline.publicName}
              />
            </li>
          ))}
        </ul>
      </label>

      <button
        className="bg-primary hover:bg-primary/90 transition p-3 ml-auto w-full text-base rounded-lg justify-center items-center text-white"
        onClick={onClearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FilterSection;
