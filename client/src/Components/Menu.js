import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../Styles/Menu.css';
import bars from '../icons8-menu-white.svg'
import { scaleRotate as Menu } from 'react-burger-menu';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import AdminLoginButtion from './AdminLoginButton'
import MainFormButton from './MainFormButton';
import TransactionFormButton from './TransactionFormButton';
import ProfileBadge from './ProfileBadge';
import DashboardButton from './DashboardButton';
import AgentButton from './AgentButton';


class MainMenu extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }

  render () {
    return (
        <div className="menu_icon">   
            <Menu  right customBurgerIcon={ <img src={bars} /> }>
                <ProfileBadge /><br/>
                <br/><br/><br/><br/>
                <DashboardButton /><br/>
                <AgentButton />
                <MainFormButton /><br/>
                <TransactionFormButton /><br/>
                <LogoutButton /><br/>
                <AdminLoginButtion /><br/>
            </Menu>
        </div> 
    );
  }
}

export default MainMenu;
