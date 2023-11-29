import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import * as THREE from "three";
import CLOUDS from "vanta/dist/vanta.clouds.min";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vantaEffect, setVantaEffect] = useState(0);

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        resetInput();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        onLogin();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const resetInput = () => {
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        CLOUDS({
          el: "#vanta",
          THREE: THREE,
          color: 0x3fffff,
          backgroundColor: 0x0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  

  return (
    
    <div id="vanta" className="loginContainer">
      <div className="red">
        <div className="login">
      <h1 className="loginText">Login</h1>
       <div className="inputBoxLogin">
          <h3 className="textLogin">Insira seus dados</h3>
          <input
          className="inputLogin"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            />
          <input
          className="inputLogin"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            />
        </div>
        <div className="buttonContainer">
          <button className="buttonLogin" onClick={login}>
            Login
          </button>
          <button className="buttonRegister" onClick={register}>
            Register
          </button>
      </div>
      </div>
      </div>
      

        

    </div>

  );
};

export default Login;
