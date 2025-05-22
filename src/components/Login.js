import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/Validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_IMG } from '../utils/constant';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const userName = name?.current?.value;
    const userEmail = email.current.value;
    const userPassword = password.current.value;

    const message = checkValidData(userName, userEmail, userPassword, isSignInForm);
    setErrorMessage(message);
    if (message) return;

    
    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: userName,
          }).then(() => {
            const { uid, email, displayName } = auth.currentUser;
            dispatch(addUser({
              uid: uid,
              email: email,
              displayName: displayName
            }));
          });
        })
        .catch((error) => {
          setErrorMessage(`${error.code} - ${error.message}`);
        });
    } else {
      signInWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: "user",
            photoURL: "https://example.com/jane-q-user/profile.jpg"
          }).catch((error) => {
            console.log("Profile update error", error);
          });
        })
        .catch((error) => {
          setErrorMessage(`${error.code} - ${error.message}`);
        });
    }
  };

  const toggleSignForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage("");
  };

  return (
    <>
      <Header />
      
      {/* Background Image */}
      <div className="absolute inset-0 -z-10 ">
        <img  
          className="w-full h-full object-cover "
          src={BG_IMG}
          alt="bg"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Responsive Form Container */}
      <div className="flex justify-center items-center min-h-screen px-4">
        <form
          className="w-96 p-8 bg-black bg-opacity-70 text-white rounded-lg "
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="text-2xl font-bold mb-6">{isSignInForm ? "Sign In" : "Sign Up"}</h1>

          {!isSignInForm && (
            <input
              ref={name}
              className="block w-full p-3 mb-4 bg-transparent border border-white rounded-lg"
              type="text"
              placeholder="Full Name"
            />
          )}

          <input
            ref={email}
            className="block w-full p-3 mb-4 bg-transparent border border-white rounded-lg"
            type="text"
            placeholder="Email Address"
          />

          <input
            ref={password}
            className="block w-full p-3 mb-4 bg-transparent border border-white rounded-lg"
            type="password"
            placeholder="Password"
          />

          {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}

          <button
            className="w-full p-3 mb-4 bg-red-700 rounded-lg hover:bg-red-600 transition duration-200"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <p
            className="text-center cursor-pointer hover:underline"
            onClick={toggleSignForm}
          >
            {isSignInForm ? "New to Netflix? Sign up now." : "Already have an account? Sign In now"}
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
