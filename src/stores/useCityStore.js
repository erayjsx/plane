import { create } from "zustand";
import { debounce } from "lodash";
import instance from "../services/instance";

const useCityStore = create((set, get) => ({
  cities: [],
  cityNames: {},
  isLoading: false,
  error: null,

  // Şehirleri API'den getiren fonksiyon
  fetchAllCities: async () => {
    set({ isLoading: true, error: null });

    let allCities = [];
    let page = 1;
    let hasMorePages = true;
    const maxPages = 22;

    try {
      while (hasMorePages && page <= maxPages) {
        const response = await instance.get(`/destinations`, {
          params: { page },
        });

        if (response.status !== 200) {
          hasMorePages = false;
          console.error("API hatası: Durum kodu", response.status);
          break;
        }

        const fetchedCities = response.data.destinations;

        if (fetchedCities.length === 0) {
          hasMorePages = false;
        } else {
          allCities = [...allCities, ...fetchedCities];
          page++;
        }
      }

      set({ cities: allCities, isLoading: false });
    } catch (error) {
      set({ error: "Şehir bilgisi alınırken hata oluştu.", isLoading: false });
      console.error("Hata: şehir bilgisi alınırken", error);
    }
  },

  fetchCityName: debounce(async (iataCode) => {
    if (!iataCode) {
      return "Amsterdam";
    }

    const state = get();
    if (iataCode in state.cityNames) {
      return state.cityNames[iataCode];
    }

    try {
      set({ isLoading: true });
      const response = await instance.get(`/destinations/${iataCode}`);
      const cityName = response.data.publicName.english;

      set((state) => ({
        cityNames: {
          ...state.cityNames,
          [iataCode]: cityName,
        },
        isLoading: false,
      }));
      return cityName;
    } catch (error) {
      console.error(`Hata: ${iataCode} için şehir bilgisi alınırken`, error);
      set({ isLoading: false });
      return "Amsterdam";
    }
  }, 300),
}));

export default useCityStore;
