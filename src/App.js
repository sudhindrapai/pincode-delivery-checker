import logo from './logo.svg';
import './App.css';
import {Switch, Route} from 'react-router-dom';

import Profile from './Containers/Profile/Profile';
import Dashboard from './Containers/Dashboard/Dashboard';
import Pincode from './Containers/Pincode/Pincode';
import Settings from './Containers/Settings/Settings';

import AdminWrapper from './HOC/Wrapper/Wrapper';



function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/pincode" component={Pincode} />
        <Route path="/settings" component={Settings} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </div>
  );
}

export default AdminWrapper(App);
