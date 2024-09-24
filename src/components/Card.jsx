import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import {
  TbPlaneDeparture,
  TbPlaneArrival,
  TbPlaneInflight,
} from "react-icons/tb";
import useAuthStore from "../stores/authStore";
import { Link } from "react-router-dom/dist";

const Card = ({
  isBooked,
  flightName,
  departureTime,
  arrivalTime,
  departureCity,
  arrivalCity,
  departureAirplane,
  arrivalAirplane,
  handleReservation,
  time,
  deleteFlight,
}) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const formatTime = (time) =>
    new Date(time).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

  let [isOpen, setIsOpen] = useState(false);
  let [isLogin, setIsLogin] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="flex flex-col shadow-sm overflow-hidden w-full bg-white rounded-bl-none rounded-2xl">
        <div className="flex p-6 flex-col">
          <div className="flex space-x-1">
            <p>{departureCity}</p>
            <p>-</p>
            <p>{arrivalCity}</p>
          </div>
          <p className="text-sm opacity-60">{flightName}</p>
        </div>

        <div className="flex items-center justify-between pt-0 p-6">
          <div>
            <div className="gap-2 mb-2 flex items-center">
              <TbPlaneDeparture />
              <p className="text-xs">Departure</p>
            </div>
            <b className="text-lg">{formatTime(departureTime)}</b>
            <p className="text-sm">Airplane: {departureAirplane}</p>
          </div>

          <div className="h-0.5 flex-1 mx-8 bg-zinc-300" />

          <div className="flex flex-col text-center items-center">
            <TbPlaneInflight className="text-2xl" />
            <p className=" text-sm">{time}</p>
          </div>

          <div className="h-0.5 flex-1 mx-8 bg-zinc-300" />

          <div>
            <div className="gap-2 mb-2 flex items-center">
              <TbPlaneArrival />
              <p className="text-xs">Arrival</p>
            </div>
            <b className="text-lg">{formatTime(arrivalTime)}</b>
            <p className="text-sm">Airplane: {arrivalAirplane}</p>
          </div>
        </div>

        <div className="flex items-start justify-between">
          <div className="pl-6">
            <b className="text-[#4B0097] text-xl">Price: $200</b>
            <p className="text-sm">Round Trip</p>
          </div>

          {isBooked ? (
            <Link
              to="/my-flights"
              className="bg-green-700 flex items-center justify-center transition hover:bg-green-800 w-32 h-16 rounded-tl-lg text-white"
            >
              Flight Booked
            </Link>
          ) : deleteFlight ? (
            <button
              onClick={deleteFlight}
              className="bg-red-700 transition hover:bg-red-800 w-32 h-16 rounded-tl-lg text-white"
            >
              Remove Flight
            </button>
          ) : isAuthenticated ? (
            <button
              onClick={handleReservation}
              className="bg-[#4B0097] transition hover:bg-primary/90 w-32 h-16 rounded-tl-lg text-white"
            >
              Book Flight
            </button>
          ) : (
            <button
              onClick={() => setIsLogin(true)}
              className="bg-[#4B0097] transition hover:bg-primary/90 w-32 h-16 rounded-tl-lg text-white"
            >
              Book Flight
            </button>
          )}
        </div>
      </div>

      <button
        onClick={open}
        className="underline text-sm px-6 py-3 rounded-b-lg text-[#4b0097f2] bg-[#E6E0EB]"
      >
        Check the details
      </button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none bg-black"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-2xl rounded-xl bg-white p-8 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h1"
                className="text-base justify-between flex items-center font-medium text-black"
              >
                <div className="flex font-bold text-xl space-x-1">
                  <p>{departureCity}</p>
                  <p>-</p>
                  <p>{arrivalCity}</p>
                </div>
                <Button
                  className="inline-flex items-center bg-secondary hover:bg-primary hover:text-white transition gap-2 rounded-full py-3 px-3 text-xl"
                  onClick={close}
                >
                  <RiCloseLargeFill />
                </Button>
              </DialogTitle>
              <div className="pt-6">
                <div className="flex mt-6 items-center justify-between pt-0 py-6">
                  <div>
                    <div className="gap-2 mb-2 flex items-center">
                      <TbPlaneDeparture />
                      <p className="text-xs">Departure</p>
                    </div>
                    <b className="text-lg">{formatTime(departureTime)}</b>
                    <p className="text-sm">Airplane: {departureAirplane}</p>
                  </div>

                  <div className="h-0.5 flex-1 mx-8 bg-zinc-300" />

                  <div className="flex flex-col text-center items-center">
                    <TbPlaneInflight className="text-2xl" />
                    <p className=" text-sm">{time}</p>
                  </div>

                  <div className="h-0.5 flex-1 mx-8 bg-zinc-300" />

                  <div>
                    <div className="gap-2 mb-2 flex items-center">
                      <TbPlaneArrival />
                      <p className="text-xs">Arrival</p>
                    </div>
                    <b className="text-lg">{formatTime(arrivalTime)}</b>
                    <p className="text-sm">Airplane: {arrivalAirplane}</p>
                  </div>
                </div>

                <p className="mt-2 text-sm/6 text-black/50"></p>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      <Dialog
        open={isLogin}
        as="div"
        className="relative z-10 focus:outline-none bg-black"
        onClose={() => setIsLogin(false)}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-8 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h1"
                className="text-base justify-center flex items-center font-medium text-black"
              >
                <Button
                  className="inline-flex items-center bg-secondary hover:bg-primary hover:text-white transition gap-2 rounded-full py-3 px-3 text-xl"
                  onClick={() => setIsLogin(false)}
                >
                  <RiCloseLargeFill />
                </Button>
              </DialogTitle>
              <div className="pt-6 text-center">
                You must log in to add the flight information to your library.
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Card;
