import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";

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
        NET({
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
    
    <div className="loginContainer">
      <div className="red">
      <h1>Login</h1>
       <div className="inputBoxLogin">
          <h3>Insira seus Dados</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            />
        </div>
        <div className="buttonContainer">
          <button className="defaultButton" onClick={login}>
            Login
          </button>
          <button className="defaultButton" onClick={register}>
            Register
          </button>
      </div>
      </div>
      
      <div id="vanta" className="blue">
        

      </div>
    </div>

  );
};

export default Login;
