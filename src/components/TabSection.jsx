import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/react";
import { RiCalendarEventFill } from "react-icons/ri";
import { TbPlaneArrival, TbPlaneDeparture } from "react-icons/tb";
import clsx from "clsx";
import { useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { useEffect } from "react";
import useCityStore from "../stores/useCityStore";

const TabSection = ({
  departureCity,
  setDepartureCity,
  arrivalCity,
  setArrivalCity,
  departureTime,
  setDepartureTime,
  arrivalTime,
  setArrivalTime,
  handleFilter,
}) => {
  const [open, setOpen] = useState(false);
  const [openArrival, setOpenArrival] = useState(false);

  const handleFocus = () => {
    setOpen(true);
  };

  const [query, setQuery] = useState("");

  const { cities, isLoading, fetchAllCities, error } = useCityStore();

  useEffect(() => {
    fetchAllCities();
  }, []);

  // Şehir listesini filtreleme
  const filteredPeople =
    query === ""
      ? cities
      : cities.filter((cityObj) => {
          return (
            cityObj.city &&
            cityObj.city.toLowerCase().includes(query.toLowerCase())
          );
        });

  if (!cities) {
    return <div>load</div>;
  }

  return (
    <div className="p-6 rounded-2xl bg-white my-6 shadow-sm">
      <TabGroup>
        <div className="flex items-center row justify-between text-sm">
          <h1 className="text-xl max-lg:text-base font-bold">
            Book Your Flight
          </h1>
          <TabList className="*:outline-none rounded-full overflow-hidden">
            <Tab
              className={({ selected }) =>
                clsx(
                  "py-2 max-lg:px-2 px-4",
                  selected ? "bg-primary text-white" : "bg-secondary text-black"
                )
              }
            >
              Round Trip
            </Tab>
            <Tab
              className={({ selected }) =>
                clsx(
                  "py-2 max-lg:px-2 px-4",
                  selected ? "bg-primary text-white" : "bg-secondary text-black"
                )
              }
            >
              One Way
            </Tab>
          </TabList>
        </div>

        <TabPanels>
          <TabPanel>
            <div className="py-8 max-lg:flex-col flex gap-4">
              <span className="flex flex-1 gap-1">
                <Combobox
                  value={departureCity}
                  onChange={setDepartureCity}
                  onClose={() => setQuery("")}
                >
                  <div className="relative border-2 h-12 items-center rounded-l-full overflow-hidden w-full">
                    <ComboboxButton className="group absolute inset-y-0 left-2 px-2.5">
                      <TbPlaneDeparture className="h-5 w-5 text-primary" />
                    </ComboboxButton>
                    <ComboboxInput
                      className={clsx(
                        "h-full w-full outline-none transition border-2 border-transparent focus:border-primary pl-12 rounded-l-full"
                      )}
                      displayValue={(item) => item?.city && item?.city}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </div>

                  <ComboboxOptions
                    anchor="bottom"
                    transition
                    className={clsx(
                      "w-[var(--input-width)] h-44 rounded-xl border mt-3 bg-white shadow-xl p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
                      "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
                    )}
                  >
                    {filteredPeople &&
                      filteredPeople.map((item) => (
                        <ComboboxOption
                          key={item.iata}
                          value={item}
                          className="group flex transition hover:bg-zinc-200 cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                        >
                          <div className="text-sm/6 text-black">
                            {item.iata} ({item.publicName.english})
                          </div>
                        </ComboboxOption>
                      ))}
                  </ComboboxOptions>
                </Combobox>

                <Combobox
                  value={arrivalCity}
                  onChange={setArrivalCity}
                  onClose={() => setQuery("")}
                >
                  <div className="relative border-2 items-center rounded-r-full overflow-hidden w-full">
                    <ComboboxButton className="group absolute inset-y-0 left-2 px-2.5">
                      <TbPlaneArrival className="h-5 w-5 text-primary" />
                    </ComboboxButton>
                    <ComboboxInput
                      className={clsx(
                        "h-full w-full outline-none transition border-2 border-transparent focus:border-primary pl-12 rounded-r-full"
                      )}
                      displayValue={(item) =>
                        item?.city ? item?.city : arrivalCity
                      }
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </div>

                  <ComboboxOptions
                    anchor="bottom"
                    transition
                    className={clsx(
                      "w-[var(--input-width)] h-44 rounded-xl border mt-3 bg-white shadow-xl p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
                      "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
                    )}
                  >
                    {filteredPeople &&
                      filteredPeople.map((item) => (
                        <ComboboxOption
                          key={item.iata}
                          value={item}
                          className="group flex transition hover:bg-zinc-200 cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                        >
                          <div className="text-sm/6 text-black">
                            {item.publicName.english} ({item.city})
                          </div>
                        </ComboboxOption>
                      ))}
                  </ComboboxOptions>
                </Combobox>
              </span>

              <span className="flex flex-1 gap-1">
                <DatePicker
                  onChange={setDepartureTime}
                  value={departureTime}
                  onCalendarClose={() => setOpen(false)}
                  calendarIcon={
                    <RiCalendarEventFill className="h-5 w-5 text-primary" />
                  }
                  clearIcon={null}
                  isOpen={open}
                  onFocus={handleFocus}
                  format="dd/MM/yyyy"
                  locale="tr-TR"
                  className="rounded-l-full  border-2 w-full"
                />
                <DatePicker
                  value={arrivalTime}
                  onChange={setArrivalTime}
                  onCalendarClose={() => setOpen(false)}
                  calendarIcon={
                    <RiCalendarEventFill className="h-5 w-5 text-primary" />
                  }
                  clearIcon={null}
                  isOpen={openArrival}
                  onFocus={() => setOpenArrival(true)}
                  format="dd/MM/yyyy"
                  locale="tr-TR"
                  className="rounded-r-full  border-2 w-full"
                />
              </span>
            </div>

            <div>
              <button
                onClick={handleFilter}
                className="bg-primary text-white py-2 px-4 rounded-lg"
              >
                Show Flights
              </button>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="py-8 max-lg:flex-col flex gap-4">
              <span className="flex flex-1 gap-1">
                <Combobox
                  value={departureCity}
                  onChange={setDepartureCity}
                  onClose={() => setQuery("")}
                >
                  <div className="relative border-2 h-12 items-center rounded-l-full overflow-hidden w-full">
                    <ComboboxButton className="group absolute inset-y-0 left-2 px-2.5">
                      <TbPlaneDeparture className="h-5 w-5 text-primary" />
                    </ComboboxButton>
                    <ComboboxInput
                      className={clsx(
                        "h-full w-full outline-none transition border-2 border-transparent focus:border-primary pl-12 rounded-l-full"
                      )}
                      displayValue={(item) =>
                        item?.city ? item?.city : arrivalCity
                      }
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </div>

                  <ComboboxOptions
                    anchor="bottom"
                    transition
                    className={clsx(
                      "w-[var(--input-width)] h-44 rounded-xl border mt-3 bg-white shadow-xl p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
                      "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
                    )}
                  >
                    {filteredPeople &&
                      filteredPeople.map((item) => (
                        <ComboboxOption
                          key={item.iata}
                          value={item}
                          className="group flex transition hover:bg-zinc-200 cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                        >
                          <div className="text-sm/6 text-black">
                            {item.publicName.english} ({item.city})
                          </div>
                        </ComboboxOption>
                      ))}
                  </ComboboxOptions>
                </Combobox>

                <Combobox value={arrivalCity} onChange={setArrivalCity}>
                  <div className="relative border-2 items-center rounded-r-full overflow-hidden w-full">
                    <ComboboxButton className="group absolute inset-y-0 left-2 px-2.5">
                      <TbPlaneArrival className="h-5 w-5 text-primary" />
                    </ComboboxButton>
                    <ComboboxInput
                      className={clsx(
                        "h-full w-full outline-none transition border-2 border-transparent focus:border-primary pl-12 rounded-r-full"
                      )}
                      displayValue={(item) =>
                        item?.city ? item?.city : arrivalCity
                      }
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </div>

                  <ComboboxOptions
                    anchor="bottom"
                    transition
                    className={clsx(
                      "w-[var(--input-width)] h-44 rounded-xl border mt-3 bg-white shadow-xl p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
                      "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
                    )}
                  >
                    {filteredPeople &&
                      filteredPeople.map((item) => (
                        <ComboboxOption
                          key={item.iata}
                          value={item}
                          className="group flex transition hover:bg-zinc-200 cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                        >
                          <div className="text-sm/6 text-black">
                            {item.publicName.english} ({item.city})
                          </div>
                        </ComboboxOption>
                      ))}
                  </ComboboxOptions>
                </Combobox>
              </span>

              <span className="flex flex-1 gap-1">
                <DatePicker
                  onChange={setDepartureTime}
                  value={departureTime}
                  onCalendarClose={() => setOpen(false)}
                  calendarIcon={
                    <RiCalendarEventFill className="h-5 w-5 text-primary" />
                  }
                  clearIcon={null}
                  isOpen={open}
                  onFocus={handleFocus}
                  format="dd/MM/yyyy"
                  locale="tr-TR"
                  className="rounded-full  border-2 w-full"
                />
              </span>
            </div>

            <div>
              <button
                type="submit"
                className="bg-primary text-white py-2 px-4 rounded-lg"
              >
                Show Flights
              </button>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default TabSection;
