import { NavLink } from "react-router-dom";
//import { FaUserCircle } from "react-icons/fa";

import './Navbar.css';

export default function Navbar() {
    // Initialisation ---------
    // Properties ---------
    //  Hooks ---------
    // Contect ---------
    // Methods ---------
    const getLinkStyle = ({isActive}) => (isActive ? 'navSelected' : null);
    // View ---------
    return (
        <nav >
            <div className="navItem">
                <NavLink to="/" className={getLinkStyle}>Bookings</NavLink>
            </div>

            <div className="navItem">
                <NavLink to="/Login" className={getLinkStyle}>Login</NavLink>
            </div>
        </nav>
    )

}

            