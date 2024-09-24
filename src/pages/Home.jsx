import { useEffect, useState } from "react";
import TabSection from "../components/TabSection";
import FlightList from "../components/FlightList";
import FilterSection from "../components/FilterSection";
import AdSection from "../components/AdSection";
import instance from "../services/instance";
import useAirlineStore from "../stores/airlineStore";

const Home = () => {
  const { airlines, fetchAirlines } = useAirlineStore();
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [departureTime, setDepartureTime] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [arrivalTime, setArrivalTime] = useState("");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedStops, setSelectedStops] = useState([]);
  const [selectedAirline, setSelectedAirline] = useState(null);
  const [sort, setSort] = useState("+flightName");

  // Yarınki tarih
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setArrivalTime(tomorrow.toISOString().split("T")[0]);
  }, []);

  // Tüm uçuşları getiren API çağrısı
  const fetchAllFlights = async () => {
    setLoading(true);
    try {
      const response = await instance.get("/flights", {
        params: { sort, airline: selectedAirline },
      });
      setFlights(response.data.flights);
    } catch (error) {
      console.error("Uçuş bilgileri alınırken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrelenmiş uçuşları getiren API çağrısı
  const fetchFilteredFlights = async (filterParams) => {
    setLoading(true);
    try {
      const response = await instance.get("/flights", {
        params: {
          includedelays: true,
          fromScheduleDate: filterParams.departureTime,
          toScheduleDate: filterParams.arrivalTime,
          route: filterParams.route,
          sort,
          airline: selectedAirline,
        },
      });
      setFlights(response.data.flights);
    } catch (error) {
      console.error("Uçuş bilgileri alınırken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filtreleme işlemi
  const handleFilter = () => {
    const filterParams = {
      departureTime,
      arrivalTime,
      route: arrivalCity
        ? `${departureCity.iata},${arrivalCity.iata}`
        : `${departureCity.iata}`,
      sort,
      airline: selectedAirline,
    };

    filterParams.route ? fetchFilteredFlights(filterParams) : fetchAllFlights();
  };

  useEffect(() => {
    fetchAirlines(sort, selectedAirline);
    fetchAllFlights();
  }, []);

  const timeFilters = [
    { value: "morning", label: "05.00 AM - 11.59 AM" },
    { value: "afternoon", label: "12.00 PM - 04.59 PM" },
  ];

  const stopFilters = [
    { value: "nonstop", label: "Nonstop" },
    { value: "oneStop", label: "1 Stop" },
    { value: "twoStops", label: "2+ Stops" },
  ];

  const handleSortChange = (newSort) => setSort(newSort);

  const handleTimeChange = (time) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const handleStopChange = (stop) => {
    setSelectedStops((prev) =>
      prev.includes(stop) ? prev.filter((s) => s !== stop) : [...prev, stop]
    );
  };

  const handleAirlineChange = (icao) => setSelectedAirline(icao);

  const handleClearFilters = () => {
    setSort("");
    setSelectedTimes([]);
    setSelectedStops([]);
    setSelectedAirline(null);
  };

  return (
    <main className="max-w-screen-2xl max-lg:flex-col mb-8 w-full flex px-8 mx-auto">
      <div className="flex-1">
        <TabSection
          departureCity={departureCity}
          setDepartureCity={setDepartureCity}
          arrivalCity={arrivalCity}
          setArrivalCity={setArrivalCity}
          departureTime={departureTime}
          setDepartureTime={setDepartureTime}
          arrivalTime={arrivalTime}
          setArrivalTime={setArrivalTime}
          handleFilter={handleFilter}
        />
        <div className="flex row flex-1 max-lg:flex-col gap-2">
          <FlightList flights={flights} loading={loading} />
          <FilterSection
            sort={sort}
            onSortChange={handleSortChange}
            timeFilters={timeFilters}
            selectedTimes={selectedTimes}
            onTimeChange={handleTimeChange}
            stopFilters={stopFilters}
            selectedStops={selectedStops}
            onStopChange={handleStopChange}
            airlineFilters={airlines}
            selectedAirline={selectedAirline}
            onAirlineChange={handleAirlineChange}
            onClearFilters={handleClearFilters}
          />
        </div>
      </div>
      <AdSection />
    </main>
  );
};

export default Home;
