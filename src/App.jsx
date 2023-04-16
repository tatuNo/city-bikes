import { Routes, Route } from "react-router-dom";
import { Journeys, Stations, Station } from "./pages";
import Navbar from "./components/Navbar";

const App = () => (
  <div className="w-full bg-neutral-800 text-white">
    <Navbar />
    <Routes>
      <Route path="/" element={<Journeys />} />
      <Route path="/stations" element={<Stations />} />
      <Route path="stations/:id" element={<Station />} />
    </Routes>
  </div>
);

export default App;
