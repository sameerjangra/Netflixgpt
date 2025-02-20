import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { USER_AVTAR, LOGO } from "../utils/constant";

const Header = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <div className="absolute top-0 left-0 w-full flex justify-between z-30">
      <div>
        <img
          className="w-44 ml-24 m-2 p-2 "
          src={LOGO}
          alt="logo"
        />
      </div>
      {user && (
        <div className="flex mr-8 self-center z-20">
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
  