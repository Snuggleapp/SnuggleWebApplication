import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import * as THREE from "three";
import CLOUDS from "vanta/dist/vanta.clouds.min";
import { Button, Input } from "@nextui-org/react";

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
          //widht and hight of the screen
          speed: 0.5,
          zoom: 0.5,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div id="vanta" className=" h-screen justify-start flex">
      <div className=" h-screen bg-black md:w-1/4 w-screen flex justify-center items-center">
        <div className=" flex flex-col gap-16 justify-center w-3/4">
          <h1 className=" text-center dark:text-neutral-200 text-7xl">
            Bem-vindo
          </h1>
          <div className=" flex flex-col gap-4">
            <h3 className=" text-xl dark:text-neutral-200">
              Insira seus dados
            </h3>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
            />
          </div>
          <div className="flex flex-row-reverse gap-4">
            <Button color="primary" onClick={login}>Login</Button>
            <Button onClick={register}>Register</Button>
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <>
  //     <div className="h-screen w-screen flex" id="vanta">
  //       <div className="w-1/3 flex flex-col bg-neutral-700 text-green-300">
  //         teste
  //       </div>
  //     </div>
  //   </>
  // );
};

export default Login;
