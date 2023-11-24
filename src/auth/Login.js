import React, { useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <div className='loginDivision'>
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
          <button className='defaultButton' onClick={login}>Login</button>
          <button className='defaultButton' onClick={register}>Register</button>
        </div>
      </div>
    </>
  );
};

export default Login;
