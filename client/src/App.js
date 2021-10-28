import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home';
import Navigate from './Components/Navigate';
import MainForm from './Components/FormMain';
import TransactionForm from './Components/TransactionForm';
import {Switch, Route, Link} from 'react-router-dom';
import CheckoutPage from './Components/CheckoutPage';
import Navigation from './Components/Navigation';
import Dashboard from './Components/Dashboard';
import MainMenu from './Components/Menu';

function App() {


  return (
    <div className="App">
      <div id="outer-container">
        <MainMenu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } />
        <main id="page-wrap">
            <Navigation/>
            <Switch>
            < Route exact path='/' component = {Home} />
            < Route exact path='/dashboard' component = {Dashboard} />
            < Route exact path='/register' component = {MainForm} />
            < Route exact path='/transactions' component =  {TransactionForm} />
            < Route exact path='/paygate' component={CheckoutPage} />
            </Switch>
        </main>
      </div>

    </div>
  );
}

export default App;
