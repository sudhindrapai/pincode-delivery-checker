import classes from './Login.module.css';
import {useState, useEffect} from 'react';

import {useHistory} from 'react-router-dom'

import { useAuth } from '../../Context/AuthContext';
import Conponents from '../../Components/ComponentIndex/ComponentIndex';


const Login = () => {
  const history = useHistory();
  const {login, currentUser, signinStatus, isRequestSent} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Button = Conponents["Button"];

  const onSignInClick = () => {
    login(email,password);
  };

  useEffect(() => {
    if (signinStatus && isRequestSent){
      history.push("/dashboard");
    } else if (isRequestSent === true && signinStatus === false) {
      console.log("login failed");
    };
  },[signinStatus, isRequestSent])

    return <div className={classes.Container}>
      <div>Sign in</div>
      <div style={{display:"none"}}>{JSON.stringify(currentUser)}</div>
      <div>
        <div className={classes.FormGroup}>
          <label htmlFor={"user email id"}>
            Email Id
          </label>
          <input type={"email"} required={true} onChange={(event) => {
            setEmail(event.target.value);
          }} />
        </div>
        <div className={classes.FormGroup}>
          <label htmlFor={"password"}>
            Password
          </label>
          <input type={"password"} required={true} onChange={(event) => {
            setPassword(event.target.value)
          }} />
        </div>
        <Button BtnSize={"BtnMd"} BtnClassName={"BtnPrimary"} clicked={onSignInClick}>
          Sign In
        </Button>
      </div>
    </div>
}

export default Login