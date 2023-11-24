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
    <>
      <div className="WelcomeDivision">
        <h9 className="welcometext">{`Bem vindo ${currentUserEmail} !!`}</h9>
        <div className="buttonContainer">
          <button className="defaultButton" onClick={logOut}>
          <FontAwesomeIcon style={{ marginRight: "10px"}} icon={faSignOutAlt} />
            Sair
          </button>
        </div>
      </div>
    </>
  );
};

export default Welcome;
