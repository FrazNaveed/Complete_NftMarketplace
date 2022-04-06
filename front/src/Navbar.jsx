import React from 'react'
import {Link} from 'react-router-dom';


const Navbar = () => {
  return (
    <div>
        <Link to="/about">  About Us   </Link>
        <Link to="/contact"> Contact Us  </Link>
    </div>
  )
}

export default Navbar