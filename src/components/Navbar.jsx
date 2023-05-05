import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <header className="sticky w-full bg-seondary p-4">
      <nav>
        <ul className="flex justify-center gap-14">
          <li
            className={`${path === "/" ? "border-b-2 border-b-orange" : null}`}
          >
            <Link to="/">Journeys</Link>
          </li>
          <li
            className={`${
              path === "/stations" ? "border-b-2 border-b-orange" : null
            }`}
          >
            <Link to="/stations">Stations</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
