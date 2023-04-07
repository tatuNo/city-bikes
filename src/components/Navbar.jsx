import { Link } from "react-router-dom";

const Navbar = () => (
  <header>
    <nav>
      <ul className="flex justify-center gap-3">
        <li>
          <Link to="/">Journeys</Link>
        </li>
        <li>
          <Link to="/stations">Stations</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Navbar;
