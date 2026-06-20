import { NavLink } from "react-router-dom";
import { FaCalendarAlt, FaHome, FaListUl, FaThLarge } from "react-icons/fa";

const BottomNav = () => {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      <NavLink to="/">
        <FaHome />
        <span>Home</span>
      </NavLink>
      <NavLink to="/matches">
        <FaCalendarAlt />
        <span>Matches</span>
      </NavLink>
      <NavLink to="/tournaments">
        <FaListUl />
        <span>Series</span>
      </NavLink>
      <NavLink to="/more">
        <FaThLarge />
        <span>More</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
