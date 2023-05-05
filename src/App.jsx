import { Routes, Route } from "react-router-dom";
import { Journeys, Stations, Station } from "./pages";
import Navbar from "./components/Navbar";

const App = () => (
  <div className="flex min-h-screen w-full flex-col bg-main text-white">
    <Navbar />
    <Routes>
      <Route path="/" element={<Journeys />} />
      <Route path="/stations" element={<Stations />} />
      <Route path="stations/:id" element={<Station />} />
    </Routes>
  </div>
);

export default App;
