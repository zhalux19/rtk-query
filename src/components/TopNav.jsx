import { Link, useLocation } from "react-router-dom";
import { api} from "../store/apiSlice";

export function TopNav() {
  const location = useLocation();
  const prefetchDogs = api.usePrefetch("getDogs");
  const prefetchService = api.usePrefetch("getService");
  return (
    <nav className="topNav">
      <ul>
        <li className={location.pathname === "/" ? "selected" : ""}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === "/services" ? "selected" : ""}>
          <Link 
            onMouseEnter={() => prefetchService("b020mc020")}
            to="/services">Services</Link>
        </li>
        <li className={location.pathname === "/dogs" ? "selected" : ""}>
          <Link to="/dogs" onMouseEnter={() => prefetchDogs()}>My Dogs</Link>
        </li>
        <li className={location.pathname === "/contact" ? "selected" : ""}>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}
