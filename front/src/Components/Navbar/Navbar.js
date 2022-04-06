import React from 'react'
import {Link} from 'react-router-dom';

const Navbar = () => {
  return (
  <>
  
        <nav className='main-nav'>
          <div className='logo'>
            <h2>
              <span>N</span>FT
              <span> M</span>ARKETPLACE
            </h2>
          </div>

            <div className='links'>
              <Link to="">  About Us   </Link>
              <Link to=""> Contact Us  </Link>
            </div>

          <div className='buttons'>

          </div>

        </nav>

  
  </>
    
  )
}

export default Navbar