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

            <Link to="/explore">  Explore  </Link>
              <Link to="/popular"> Popular  </Link>
              <Link to="/sale"> Sale  </Link>
              <Link to="/collection"> My Collection  </Link>
              <Link to="/creators"> Creators  </Link>

          </div>

        </nav>

  
  </>
    
  )
}

export default Navbar