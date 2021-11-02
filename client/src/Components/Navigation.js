import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { useState } from 'react';
import Logo from "../logo-04.png";

function Navigation(){ 
        const {user} = useAuth0();
        const [collapsed, setCollapsed] = useState(true);      
        const toggleNavbar = () => setCollapsed(!collapsed);
        const [menuOpenState, setMenuOpenState] = useState(false)


    return(
        
        <nav className="navbar navbar-expand-lg navbar-light bg-classic">
        <div className="container-fluid">
          <a className="navbar-brand" href="/dashboard">
          <img className="brand" src={Logo} alt={"RMS"}/>
          </a>
        
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
            
            </ul>
          </div>
        </div>
      </nav>
    )

}

export default Navigation