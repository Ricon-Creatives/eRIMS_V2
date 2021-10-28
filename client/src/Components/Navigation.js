import { useAuth0 } from '@auth0/auth0-react';
import React from 'react'
import LogoMain from '../logoiconic.png'
import { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import Navigate from './Navigate';
import { slide as Menu } from 'react-burger-menu'

function Navigation(){ 
        const {user} = useAuth0();
        const [collapsed, setCollapsed] = useState(true);      
        const toggleNavbar = () => setCollapsed(!collapsed);
        const [menuOpenState, setMenuOpenState] = useState(false)


    return(
        
        <nav>
            <Navbar dark>
            <div href="/" className="mr-auto"> <img className="brand" src={LogoMain} alt={"RMS"} height="70px"   width="70px"/> </div>
            
                
            </Navbar>
        </nav>
    )

}

export default Navigation