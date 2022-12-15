import Navbar from './Navbar.js';
import Header from './Header.js';

import './Layout.scss';


function Layout(props) {
    // Properties ---------
    //  Hooks ---------
    // Contect ---------
    // Methods ---------
    // View ---------
    return (
        <div className='container'>
            <div class="grid grid-responsive custom-scroll">
                <div class="card header"><Header /></div>
                <div class="aside"><Navbar /></div>
                <div class="card main"><main className='main-layout'>
                        {props.children}
                    </main>
                </div>
            </div>
        </div>
    );

}

export default Layout;