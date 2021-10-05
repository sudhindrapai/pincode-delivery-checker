import logo from './logo.svg';
import './App.css';

import Profile from './Containers/Profile/Profile';

import AdminWrapper from './HOC/Wrapper/Wrapper'

function App() {
  return (
    <div className="App">
      <Profile />
    </div>
  );
}

export default AdminWrapper(App);
