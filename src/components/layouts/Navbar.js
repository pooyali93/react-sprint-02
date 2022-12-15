import { NavLink } from "react-router-dom";

import './Navbar.css';

export default function Navbar() {
    // Initialisation ---------
    // Properties ---------
    //  Hooks ---------
    // Contect ---------
    // Methods ---------
    const getLinkStyle = (isActive) => (isActive ? 'navSelected' : null);
    // View ---------
    return (
        <nav className="nav-responsive">
            <div className="profile">
                <img class="circular--square" src="https://media-exp1.licdn.com/dms/image/D4E03AQHHtYavs893cw/profile-displayphoto-shrink_400_400/0/1666556734597?e=1676505600&v=beta&t=g_RCsj19xhm5G_YpnRo5CsPjVcdJnBeJmommFo6ygYo" alt="Profile"/>
                <p>Welcome Pooya</p>
            </div>
            <div className="navItem">
                <NavLink to="/" className={getLinkStyle}>Bookings</NavLink>
            </div>
            <div className="navItem">
                <NavLink to="/vehicles" className={getLinkStyle}>Vehicles</NavLink>
            </div>
            <div className="navItem">
                <NavLink to="/users" className={getLinkStyle}>Users</NavLink>
            </div>

            <div className="navItem">
                <NavLink to="/Login" className={getLinkStyle}>Login</NavLink>
            </div>
        </nav>
    )

}

            