import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/Validate';
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { auth } from '../utils/firebase';

import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch()

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const userName = name?.current?.value;
    const userEmail = email.current.value;
    const userPassword = password.current.value;

    const message = checkValidData(userName ,userEmail, userPassword, isSignInForm);
    setErrorMessage(message);

    if (message) return;
    if(!isSignInForm){
      createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        updateProfile(user, {
          displayName: userName,
        })
          .then(() => {
            const {uid,email,displayName} = auth.currentUser;
            dispatch(addUser (
              {
                uid:uid,
                email:email,
                displayName:displayName
              }) 
              )
          
          })
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" +errorMessage)
  });
    }else{
      signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        updateProfile(user, {
          displayName: "user",
           photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(() => {
          // Profile updated!
          // ..
        }).catch((error) => {
          // An error occurred
          // ...
        }); 
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" +errorMessage)
      });
      
    }
  };

  const toggleSignForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(""); // Clear error when switching forms
  };

  return (
    <>   
      <Header />
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0">
        <img 
          className="w-full h-full object-cover" 
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fb5cb900-0cb6-4728-beb5-579b9af98fdd/web/IN-en-20250127-TRIFECTA-perspective_cf66f5a3-d894-4185-9106-5f45502fc387_large.jpg" 
          alt="bg-image" 
        />
        <div className="absolute inset-0 bg-black/60"></div> {/* Dark Overlay */}
      </div>

      {/* Login Form */}
      <div className="w-[28rem] p-10 bg-black absolute my-36 mx-auto right-0 left-0 text-white opacity-70 rounded-lg">
        <form className="self-center" onSubmit={(e) => e.preventDefault()}>
          <h1 className="text-2xl p-2 mb-2 font-bold">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
          
          {!isSignInForm && (
            <input 
            ref={name}
              className="m-5 p-4 w-80 bg-transparent border border-white rounded-lg" 
              type="text" 
              placeholder="Full Name" 
            />
          )}
          <input 
            ref={email}  
            className="m-5 mt-0 p-4 w-80 bg-transparent border border-white rounded-lg" 
            type="text" 
            placeholder="Email Address" 
          />
          <input 
            ref={password}  
            className="m-5 mt-0 p-4 w-80 bg-transparent border border-white rounded-lg" 
            type="password" 
            placeholder="Password" 
          />
          
          {/* Error Message Below Password */}
          {errorMessage && <p className="text-red-500 text-sm  ml-5">{errorMessage}</p>}

          <button 
            className="m-5 mt-2 p-2 w-80 bg-red-700 rounded-lg text-center" 
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <h3 
            className="self-center text-center cursor-pointer" 
            onClick={toggleSignForm}
          >
            {isSignInForm ? "New to Netflix? Sign up now." : "Already have an account? Sign In now"}
          </h3>
        </form>
      </div>
    </>
  );
};

export default Login;
