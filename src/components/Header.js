import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { USER_AVTAR, LOGO } from "../utils/constant";
import { resetSelectedMovie } from "../utils/movieSlice";


const Header = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogoClick = () => {
    dispatch(resetSelectedMovie());
    navigate("/browse");
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

    return () => unsubscribe();
  }, [dispatch, navigate]);

  return (
    <div className="absolute top-0 left-0 w-full z-30 px-4 py-2 bg-gradient-to-b from-black via-black/70 to-transparent">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <img
          className="h-9 md:h-14 cursor-pointer"
          src={LOGO}
          alt="logo"
          onClick={handleLogoClick}
        />

        {/* Right Side */}
        {user && (
          <div className="flex items-center gap-3">
            <img className="h-6 w-6 md:h-12 md:w-12" src={USER_AVTAR} alt="user" />
            <span className="text-white font-semibold text-sm sm:text-base">
              {user.displayName}
            </span>

            {/* Desktop: Sign Out */}
            <button
              onClick={handleSignOut}
              className="hidden sm:inline text-white font-bold hover:underline text-sm"
            >
              Sign Out
            </button>

            {/* Mobile: Menu Icon */}
            <button
              onClick={() => setShowMobileMenu(true)}
              className="sm:hidden text-white text-2xl font-bold mb-1"
            >
              ☰
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 bg-gradient-to-b from-black to-[#0a0f20] text-white px-6 py-6 sm:hidden transition duration-300">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Menu</h2>
            <button
              onClick={() => setShowMobileMenu(false)}
              className="text-white text-3xl font-bold"
            >
              &times;
            </button>
          </div>

            <button
              onClick={handleSignOut}
              className="w-full text-center text-white font-bold hover:underline text-base"
            >
              Sign Out
            </button>
          <div className="mt-10 border-t border-white/20 pt-6">
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
