
import { FaBell, FaRegUserCircle } from "react-icons/fa";

const Header = ({ activeTab, onTabChange, tabs = [] }) => {
  return (
    <header className="header">
      <div className="brand-row">
        <h1>
          cric<span>score</span>
        </h1>

        <div className="header-actions">
          <button type="button" aria-label="Notifications">
            <FaBell />
          </button>
          <button type="button" aria-label="Profile">
            <FaRegUserCircle />
          </button>
        </div>
      </div>

      <div className="header-tabs">
        {tabs.map((tab) => (
          <button
            className={activeTab === tab.value ? "active" : ""}
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;
