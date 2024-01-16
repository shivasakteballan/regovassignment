import { Outlet, Link } from "react-router-dom";
import "./root.css";

export default function Root() {
  return (
    <>
      <div className="menu-bar">
        <h1 className="header">Menu</h1>
        
        <nav>
          <ul>
            <li>
              <Link to={``}>Dashboard</Link>
            </li>
            <li>
              <Link to={`watchlist/`}>Watchlist</Link>
            </li>
            <li>
              <Link to={`myProfile/`}>My Profile</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="content" id="detail">
        <Outlet />
      </div>
    </>
  );
}
