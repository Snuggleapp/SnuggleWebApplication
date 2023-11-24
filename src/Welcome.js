import React, { useContext } from "react";
import { AuthContext } from "./auth/Auth";
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

const Welcome = () => {
  const { currentUser } = useContext(AuthContext);
  const currentUserEmail = currentUser ? currentUser.email : "";

  const logOut = () => {
    signOut(auth);
  };

  return (<>
    <div className="WelcomeDivision">
      <h2 className="division">{`bem-vindo ${currentUserEmail}`}</h2>
      <div className="buttonContainer">
        <button className='defaultButton' onClick={logOut}>Log Out</button>
      </div>
    </div>
  </>);
};

export default Welcome;
