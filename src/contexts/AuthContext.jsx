// AuthContext.jsx
// Provides a global context for the user object which contains uid and more
// Provides a global context for the Firebase auth functions we need to enable login, logout, and sign up

// Hooks
import { createContext, useContext, useEffect, useState } from 'react';
// Firebase
// auth is the authentication instance exported from firebase-config.js
// It is connected to our firebase project
import { auth } from '../firebase/firebase-config.js';
import { onAuthStateChanged } from 'firebase/auth';
import { signUp, logOut, signIn } from '../firebase/firebase-auth';

// Create an auth context where we'll store everything related to auth (firebase functions, user object, etc.)
const AuthContext = createContext();

// AuthProvider is a wrapper component that:
// - Manages and provides authentication state (user)
// - Provides auth functions (login, register, logout)
// - Listens for auth changes (login, logout)
export const AuthProvider = ({ children }) => {
  // useState(null) initializes user as null (no one is logged in yet)
  // setUser updates the state
  const [user, setUser] = useState(null);

  // Listen for auth changes
  useEffect(() => {
    // onAuthStateChanged(auth, callback) is a firebase function that monitors the users login state
    // Every time the user logs in, logs out, or refreshes, this function fires automatically
    // It calls setUser(currentUser) to update state with the logged-in user
    // currentUser is impliclty passed by auth (auth will return a new user object when we call the functions to log in, log out, sign up, etc.)
    // onAuthStateChanged() is automatically keeing our internal user state in synce with firebase and the user object it returns through auth
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    // Returning unsubscribe() stops the listener when the component unmounts (avoiding memory leaks)
    return () => unsubscribe();
  }, []);

  //  Define the auth functions
  const register = async (email, password) => {
    return await signUp(email, password);
  };
  const login = async (email, password) => {
    return await signIn(email, password);
  };
  const logout = async () => {
    await logOut(auth);
  };

  // Provide the auth context by wrapping all child components inside the AuthProvider
  // Provide user, register, login, and logout so any component can use them
  // {children} allows other components inside <AuthProvider> to use this context
  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook for easy access to the auth context
export const useAuth = () => useContext(AuthContext);
