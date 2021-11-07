import './App.css';
import {Switch, Route} from 'react-router-dom';

import Login from './Containers/Login/Login'
import Dashboard from './Containers/Dashboard/Dashboard';
import Settings from './Containers/Settings/Settings';
import InvoiceView from './Containers/Invoice/Invoice';
import CreateInvoice from './Containers/Create/CreateInvoice';
import InvoiceList from './Containers/InvoiceList/InvoceList';

import AdminWrapper from './HOC/Wrapper/Wrapper';

import {AuthProvider} from "./Context/AuthContext"


function App() {

  return (
    <div className="App">
      <AuthProvider>
      <Switch>
        <Route path = "/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/invoice/list" component={InvoiceList} />
        <Route path="/settings" component={Settings} />
        <Route path="/create/invoice" component={CreateInvoice} />
        <Route path="/invoice/view" component={InvoiceView} />
        <Route path="**" component={Login} />
      </Switch>
      </AuthProvider>
    </div>
  );
}


export default AdminWrapper(App);
