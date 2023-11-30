import React, { useContext } from "react";
import { AuthContext } from "./auth/Auth";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import NavbarApp from "./Components/NavbarApp";

// icons

const Welcome = () => {
  const { currentUser } = useContext(AuthContext);
  const currentUserEmail = currentUser ? currentUser.email : "";

  const logOut = () => {
    signOut(auth);
  };

  return (
    <>
      <NavbarApp />
    </>
  );
};

export default Welcome;
