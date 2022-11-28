
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import Header from './Header.js';

import './Layout.css';


function Layout(props) {
    // Properties ---------
    //  Hooks ---------
    // Contect ---------
    // Methods ---------
    // View ---------
    return (
        <div className='container'>
          <Header />
          <Navbar />
            <main className='main-layout'>
                {props.children}
            </main>
            <Footer/>
        </div>
    );

}

export default Layout;