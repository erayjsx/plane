import { create } from "zustand";
import axios from "axios";

const token = localStorage.getItem("token");

const useFlightStore = create((set) => ({
  flights: [],
  loading: false,
  error: null,

  // Uçuşları listele
  fetchFlights: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("http://localhost:2000/api/flights", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`, // Token'ı buraya ekleyin
        },
      });
      set({ flights: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Uçuş ekle
  addFlight: async (flightData) => {
    try {
      const response = await axios.post(
        "http://localhost:2000/api/flights",
        flightData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, // Token'ı buraya ekleyin
          },
        }
      );
      set((state) => ({
        flights: [...state.flights, response.data],
      }));
    } catch (error) {
      console.error("Uçuş eklenirken hata oluştu:", error);
    }
  },

  // Uçuş sil
  deleteFlight: async (id) => {
    try {
      await axios.delete(`http://localhost:2000/api/flights/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`, // Token'ı buraya ekleyin
        },
      });
      set((state) => ({
        flights: state.flights.filter((flight) => flight._id !== id),
      }));
    } catch (error) {
      console.error("Uçuş silinirken hata oluştu:", error);
    }
  },
}));

export default useFlightStore;
