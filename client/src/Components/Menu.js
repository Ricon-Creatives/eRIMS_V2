import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../Styles/Menu.css';
import bars from '../icons8-menu-white.svg'
import { slide as Menu } from 'react-burger-menu';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import MainFormButton from './MainFormButton';
import TransactionFormButton from './TransactionFormButton';


class MainMenu extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }

  render () {
    return (
        <div className="menu_icon">   
            <Menu  right customBurgerIcon={ <img src={bars} /> }>
                <MainFormButton />
                <TransactionFormButton />
                <LoginButton />
                <LogoutButton />
            </Menu>
        </div> 
    );
  }
}

export default MainMenu;
