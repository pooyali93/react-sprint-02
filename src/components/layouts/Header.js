import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
    // Properties ---------
    //  Hooks ---------
    // Contect ---------
    // Methods ---------
    // View ---------
    return (
        <header>
            <Link to="/">
            <img src="https://img.icons8.com/small/50/undefined/gender-neutral-user.png" alt=""></img>
            </Link>
            <Link to="/">
             <h1>Car Dealership</h1>
            </Link>
            <div className="login">
                <p>Welcome Pooya</p>
            </div>
        </header>
    )

}
