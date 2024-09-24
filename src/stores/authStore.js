import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set, get) => ({
  token: null,
  isAuthenticated: false,
  loginError: null,
  logoutTimer: null,

  // Kullanıcı girişi
  login: async (username, password) => {
    try {
      const response = await axios.post(
        "http://localhost:2000/api/auth/login",
        {
          username,
          password,
        },
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
          withCredentials: true,
        }
      );
      const { token } = response.data;

      set({ token, isAuthenticated: true, loginError: null });
      localStorage.setItem("token", token); // Token'ı localStorage'a kaydet

      const timer = setTimeout(() => {
        set({ token: null, isAuthenticated: false });
        localStorage.removeItem("token");
        window.location.reload();
      }, 600000);

      set({ logoutTimer: timer });
    } catch (error) {
      set({ loginError: error.response?.data?.message || "Login failed" });
    }
  },

  // Kullanıcı çıkışı
  logout: () => {
    set({ token: null, isAuthenticated: false });
    localStorage.removeItem("token");
    clearTimeout(get().logoutTimer);
    window.location.reload();
  },

  verifyAuth: () => {
    const token = localStorage.getItem("token");
    if (token) {
      set({ token, isAuthenticated: true });
    }
  },
}));

export default useAuthStore;
