import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { USER_AVTAR, LOGO, SUPPORTED_LANGUAGES } from "../utils/constant";
import { toogleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import { resetSelectedMovie } from "../utils/movieSlice"; // ✅ Import the reset action


const Header = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showGptSearch =useSelector((store)=>store.gpt.showGptSearch)

  const handleLogoClick = () => {
    dispatch(resetSelectedMovie()); // ✅ Reset the selected movie
    navigate("/browse"); // ✅ Navigate to the browse page
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.error("Sign-out error:", error);
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      try {
        if (user) {
          const { uid, email, displayName } = user;
          dispatch(addUser({ uid, email, displayName }));
          navigate("/browse");
        } else {
          dispatch(removeUser());
          navigate("/");
        }
      } catch (error) {
        console.error("Auth state change error:", error);
      }
    });

    return () => unsubscribe(); // Cleanup
  }, [dispatch, navigate]);


  const handleGptSearchClick =()=>{
    dispatch(toogleGptSearchView());
  }

  const handleLanguageChange =(e)=>{
    dispatch (changeLanguage(e.target.value))
  }

  return (
    <div className="absolute top-0 left-0 w-full flex justify-between z-30">

      <div>
        <img
          className="w-44 ml-24 m-2 p-2 "
          src={LOGO}
          alt="logo"
          onClick={handleLogoClick}
        />
      </div>
      {user && (
        <div className="flex mr-8 self-center z-20">
          {showGptSearch && (
          <select className="p-2 m-2 bg-gray-900 text-white" 
          onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map(
              lang=> <option  
              key={lang.identifier} 
              value={lang.identifier}>{lang.name}
                </option>)}
          </select>)}
          <button className=" bg-blue-500 py-2 px-4 m-2 rounded-lg text-white"
          onClick={handleGptSearchClick}>
            {showGptSearch ? "Homepage" : "GPT Search"}
            </button>
          <img
            className="h-14 w-14 p-2 m-2"
            alt="userlogo"
            src={USER_AVTAR}
          />
          <span className="font-bold text-center self-center text-white">
            ({user?.displayName})
          </span>
          <button onClick={handleSignOut} className="font-bold text-lg m-2 p-2 text-white">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
  