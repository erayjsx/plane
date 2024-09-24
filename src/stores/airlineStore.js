import { create } from "zustand";
import axios from "axios";
import instance from "../services/instance";

const useAirlineStore = create((set) => ({
  airlines: [],
  loading: false,
  error: null,

  fetchAirlines: async () => {
    set({ loading: true });
    try {
      const response = await instance.get("/airlines");
      set({ airlines: response.data.airlines, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useAirlineStore;
