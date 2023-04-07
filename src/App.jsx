import { Routes, Route } from "react-router-dom";
import { Journeys } from "./pages";
import Navbar from "./components/Navbar";

const App = () => (
  <div className="w-full bg-neutral-800 text-white">
    <Navbar />
    <Routes>
      <Route path="/" element={<Journeys />} />
    </Routes>
  </div>
);

export default App;
