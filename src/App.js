import './App.css';
import {Switch, Route} from 'react-router-dom';

import Login from './Containers/Login/Login'
import Profile from './Containers/Profile/Profile';
import Dashboard from './Containers/Dashboard/Dashboard';
import Pincode from './Containers/Pincode/Pincode';
import Settings from './Containers/Settings/Settings';
import InvoiceView from './Containers/Invoice/Invoice';
import CreateInvoice from './Containers/Create/CreateInvoice';

import AdminWrapper from './HOC/Wrapper/Wrapper';

import {AuthProvider} from "./Context/AuthContext"


function App() {

  return (
    <div className="App">
      <AuthProvider>
      <Switch>
        <Route path = "/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/pincode" component={Pincode} />
        <Route path="/settings" component={Settings} />
        <Route path="/profile" component={Profile} />
        <Route path="/create/invoice" component={CreateInvoice} />
        <Route path="/invoice/view" component={InvoiceView} />
        <Route path="**" component={Login} />
      </Switch>
      </AuthProvider>
    </div>
  );
}

export default AdminWrapper(App);
