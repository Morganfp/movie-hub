// AuthModal.jsx
// Renders the modal for user login and sign up
// Contains two React hook Forms for login and sign up

// Hooks
import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
// Firebase
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
// Contexts
import { AuthModalContext } from '../contexts/AuthModalContext.js';
// Styles
import '../styles/AuthModal.css';
import { IoIosClose } from 'react-icons/io';
import { toast } from 'react-toastify';

function AuthModal() {
  // State to conditionally display login or registration form
  const [showLogin, setShowLogin] = useState(true);
  // Destructure the AuthModalContext context
  const { showAuthModal, setShowAuthModal } = useContext(AuthModalContext);
  // Destructure the auth functions
  const { register, login } = useAuth();

  // Initlaize React Hook Forms for login and sign up
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    reset: resetLogin,
    setError: setErrorLogin,
    formState: { errors: errorsLogin },
  } = useForm();
  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    reset: resetSignUp,
    setError: setErrorSignUp,
    formState: { errors: errorsSignUp },
  } = useForm();

  // Reset the forms when the modal opens and closes
  useEffect(() => {
    resetLogin();
    resetSignUp();
    setShowLogin(true);
  }, [showAuthModal]);

  // Handle login form submission
  const onSubmitLogin = async (data) => {
    try {
      // Attempt to log the user in
      // This will call the Firebase Auth login function
      // which will make the user state (logged in user available for the entire app in main.jsx)
      await login(data.email, data.password);
      // Reset form fields
      resetLogin();
      // Close modal
      setShowAuthModal(false);
      // Show toast success notification
      toast.success('Welcome back! 🎬');
      // Handle incorrect login and other errors
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        // Display the error below the last input box (password)
        setErrorLogin('password', {
          type: 'manual',
          message: 'Invalid email or password.',
        });
      } else {
        // Display any other error below the last input box (password)
        setErrorLogin('password', {
          type: 'manual',
          message: 'Something went wrong. Please try again.',
        });
      }
    }
  };

  // Handle sign up form submission
  const onSubmitSignUp = async (data) => {
    try {
      // Attempt to register the new user
      // This will call the Firebase Auth signup function
      // which will make the user state (logged in user available for the entire app in main.jsx)
      const user = await register(data.email, data.password);
      console.log('user');
      console.log('db', db);
      // Ensure user is available before proceeding
      if (!user) return;
      // Create a user object to store in Firestore
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      // Reset form fields
      resetSignUp();
      // Close the modal
      setShowAuthModal(false);
      // Show toast success notification
      toast.success('Welcome to Movie Hut! 🎬');
    } catch (error) {
      // Catch already registered and other errors
      if (error.code === 'auth/email-already-in-use') {
        setErrorSignUp('email', {
          type: 'manual',
          message: 'Email is already in use.',
        });
      } else {
        // Display any other error below the last input box (password)
        setErrorSignUp('password', {
          type: 'manual',
          message: 'Something went wrong. Please try again.',
        });
      }
    }
  };

  return (
    <>
      <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Conditionally show the login or sign up form */}
        {showLogin ? (
          // Login form
          <form
            onSubmit={handleSubmitLogin(onSubmitLogin)}
            id="loginForm"
            className="modalForm"
          >
            {/* Button to close the modal */}
            <div
              onClick={() => setShowAuthModal((prev) => !prev)}
              className="fixed top-3 left-3"
              aria-label="Close authentication modal"
            >
              <IoIosClose size={22} />
            </div>
            {/* Title + Subtitle */}
            <h1 className="modalTitle" aria-live="assertive">
              Login
            </h1>
            <p className="modalSubTitle">Access your exclusive features</p>
            {/* Email */}
            <div className="modalSection">
              <label htmlFor="loginEmail">Email</label>
              <input
                id="loginEmail"
                autoComplete="email"
                {...registerLogin('email', {
                  required: 'Please enter a valid email.',
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: 'Enter a valid email address.',
                  },
                })}
                className="modalInput"
                type="email"
                aria-describedby="loginEmailError"
              />
              {errorsLogin.email && (
                <p id="loginEmailError" className="modalError">
                  {errorsLogin.email.message}
                </p>
              )}
            </div>
            {/* Password */}
            <div className="modalSection">
              <label htmlFor="loginPassword">Password</label>
              <input
                id="loginPassword"
                {...registerLogin('password', {
                  required: 'Please enter your password.',
                })}
                className="modalInput"
                type="password"
                aria-describedby="loginPasswordError"
              />
              {errorsLogin.password && (
                <p id="loginPasswordError" className="modalError">
                  {errorsLogin.password.message}
                </p>
              )}
            </div>
            {/* Submit button */}
            <button type="submit" className="modalSubmitBtn font-semibold">
              Login
            </button>
            {/* Switch modal prompt */}
            <div className="flex gap-1">
              <p className="modalSwitchText">Don’t have an account? </p>
              {/* Switch to sign up form */}
              <p
                onClick={() => {
                  // Reset the form fields
                  resetSignUp();
                  resetLogin();
                  // Swicth form
                  setShowLogin((prev) => !prev);
                }}
                className="modalSwitchBtn"
              >
                Sign up
              </p>
            </div>
          </form>
        ) : (
          // Sign up form
          <form
            onSubmit={handleSubmitSignUp(onSubmitSignUp)}
            id="signUpForm"
            className="modalForm"
          >
            {/* Button to close the modal */}
            <div
              onClick={() => setShowAuthModal((prev) => !prev)}
              className="fixed top-3 left-3"
            >
              <IoIosClose size={22} />
            </div>
            {/* Title + Subtitle */}
            <h1 className="modalTitle" aria-live="assertive">
              Sign Up
            </h1>
            <p className="modalSubTitle">Unlock exclusive features</p>
            {/* First name */}
            <div className="modalSection">
              <label htmlFor="signUpFirstName">First Name</label>
              <input
                id="signUpFirstName"
                autoComplete="given-name"
                {...registerSignUp('firstName', {
                  required: 'Please enter your first name.',
                })}
                className="modalInput"
                type="text"
                aria-describedby="signUpFirsNameError"
              />
              {errorsSignUp.firstName && (
                <p id="signUpFirstNameError" className="modalError">
                  {errorsSignUp.firstName.message}
                </p>
              )}
            </div>
            {/* Last name */}
            <div className="modalSection">
              <label htmlFor="signUpLastName">Last Name</label>
              <input
                id="signUpLastName"
                autoComplete="family-name"
                {...registerSignUp('lastName', {
                  required: 'Please enter your last name.',
                })}
                className="modalInput"
                type="text"
                aria-describedby="signUpLastNameError"
              />
              {errorsSignUp.lastName && (
                <p id="signUpLastNameError" className="modalError">
                  {errorsSignUp.lastName.message}
                </p>
              )}
            </div>
            {/* Email */}
            <div className="modalSection">
              <label htmlFor="signUpEmail">Email</label>
              <input
                id="signUpEmail"
                autoComplete="email"
                {...registerSignUp('email', {
                  required: 'Please enter your email.',
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: 'Enter a valid email address',
                  },
                })}
                className="modalInput"
                type="email"
                aria-describedby="signUpEmailError"
              />
              {errorsSignUp.email && (
                <p id="signUpEmailError" className="modalError">
                  {errorsSignUp.email.message}
                </p>
              )}
            </div>
            {/* Password */}
            <div className="modalSection">
              <label htmlFor="signUpPassword">Password</label>
              <input
                id="signUpPassword"
                {...registerSignUp('password', {
                  required: 'Please enter a password.',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                })}
                className="modalInput"
                type="password"
                aria-describedby="signUpPasswordError"
              />
              {errorsSignUp.password && (
                <p id="signUpPasswordError" className="modalError">
                  {errorsSignUp.password.message}
                </p>
              )}
            </div>
            {/* Submit button */}
            <button type="submit" className="modalSubmitBtn font-semibold">
              Sign Up
            </button>
            {/* Switch modal prompt */}
            <div className="flex gap-1">
              <p className="modalSwitchText">Already have an account? </p>
              {/* Switch to sign up form */}
              <p
                onClick={() => {
                  // Reset the form fields
                  resetSignUp();
                  resetLogin();
                  // Swicth form
                  setShowLogin((prev) => !prev);
                }}
                className="modalSwitchBtn"
              >
                Login
              </p>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default AuthModal;
