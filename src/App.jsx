import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import MyFlights from "./pages/MyFlights";
import useAuthStore from "./stores/authStore";
import { useEffect } from "react";

function App() {
  const verifyAuth = useAuthStore((state) => state.verifyAuth);

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-flights" element={<MyFlights />} />
        <Route path="*" element={<NotFound />} /> {/* 404 sayfası */}
      </Routes>
    </Router>
  );
}

export default App;
