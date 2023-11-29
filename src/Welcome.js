import React, { useContext } from "react";
import { AuthContext } from "./auth/Auth";
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// icone de log out
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

// icons

const Welcome = () => {
  const { currentUser } = useContext(AuthContext);
  const currentUserEmail = currentUser ? currentUser.email : "";

  const logOut = () => {
    signOut(auth);
  };


  
  

  return (
    <div className="containerMenu">
      {/* header */}
      <div className="header">

      </div>
      <div className="menu">
        <div className="menuWelcome">
          <h1 className="welcome">Welcome</h1>

          <h2 className="email">{currentUserEmail}</h2>
         
        </div>
      </div>
      {/* footer */}
      <div className="footer">
        <p>© 2021 Snuggle Inc. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Welcome;
