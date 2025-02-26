// firebase-auth.js
// Import built in Firebase functions for sign up, sign in, and logout
// Configure the built in Firebase functions and export them as custom functions

// Import built in firebase functions and auth provided by firebase-config.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from './firebase-config';

export const signUp = async (email, password) => {
  try {
    // createUserWithEmailAndPassword registers a new user with an email and password
    // Firebase automatically stores the user in its auth system
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Return the new user object (user uid, email, etc.) which we can use on the front end
    return userCredential.user;
  } catch (error) {
    console.error('Sign Up Error:', error.message);
    // Re-throw the error so it can be handled on the front end
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    // Firebase verifies the provided email and password against the auth system
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // If the credentials are correct, the user object is returned
    return userCredential.user;
  } catch (error) {
    console.error('Sign In Error:', error.message);
    throw error;
  }
};

export const logOut = async () => {
  try {
    // Firebase removes the user’s session from memory
    // We can then update the UI
    await signOut(auth);
  } catch (error) {
    console.error('Sign Out Error:', error.message);
    throw error;
  }
};
