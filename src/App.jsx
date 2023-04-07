import { Routes, Route } from "react-router-dom";
import { Journeys, Stations } from "./pages";
import Navbar from "./components/Navbar";

const App = () => (
  <div className="w-full bg-neutral-800 text-white">
    <Navbar />
    <Routes>
      <Route path="/" element={<Journeys />} />
      <Route path="/stations" element={<Stations />} />
    </Routes>
  </div>
);

export default App;
