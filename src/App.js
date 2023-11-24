import React, { useState } from 'react';
import { AuthProvider } from './auth/Auth';
import Login from './auth/Login';
import Welcome from './Welcome';
import SnapshotFirebaseAdvanced from './Main';

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <AuthProvider>
      {isLoggedIn ? (
        <>
          <Welcome />
          <SnapshotFirebaseAdvanced />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </AuthProvider>
  );
};

export default App;