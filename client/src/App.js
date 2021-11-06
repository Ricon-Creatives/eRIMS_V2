import './App.css';
import {Switch, Route, Link} from 'react-router-dom';
import Navigation from './Components/Navigation';
import MainMenu from './Components/Menu';
import Login from './Components/components/Login'
import AgentRegister from './Components/components/AgentRegister'
import PayeeRegister from './Components/components/PayeeRegister'
import Checkout from './Components/components/Checkout'
import CheckoutPage from './Components/CheckoutPage'
import Dashboard from './Components/Dashboard';
import PayeeTable from './Components/PayeeTable';
import PaymentsTable from './Components/PaymentsTable';
import AgentTable from './Components/AgentTable';

function App() {


  return (
    <div className="App">
      <div id="outer-container">
        <MainMenu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } />
        <main id="page-wrap">
            <Navigation/>
            <Switch>
            < Route exact path='/' component = {Login} />
            < Route exact path='/agent-register' component = {AgentRegister} />
            < Route exact path='/payee-register' component = {PayeeRegister} />
            < Route exact path='/checkout' component = {Checkout} />
            < Route exact path='/paygate' component = {CheckoutPage} />
            < Route exact path='/dashboard' component = {Dashboard} />
            < Route exact path='/payee-table' component = {PayeeTable} />
            < Route exact path='/payment-table' component = {PaymentsTable} />
            < Route exact path='/agent-table' component = {AgentTable} />
            </Switch>
        </main>
      </div>

    </div>
  );
}

export default App;
