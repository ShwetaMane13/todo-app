"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";

import { setUser } from "@/slices/authSlice";

const Auth = () => {
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const [isRegister, setIsRegister] = useState(false);
  const dispatch = useDispatch();

  const handleChange = ({ target: { name, value } }) => {
    setUserDetails({ ...userDetails, [name]: value });
  };

  //should be moved to apis
  const handleAuth = async () => {
    try {
      const userCredential = isRegister
        ? await createUserWithEmailAndPassword(
            auth,
            userDetails.email,
            userDetails.password
          )
        : await signInWithEmailAndPassword(
            auth,
            userDetails.email,
            userDetails.password
          );

      let user = {
        uid: userCredential.user.uid,
        accessToken: userCredential.user.accessToken,
        email: userCredential.user.email,
      };
      dispatch(setUser(user));
    } catch (error) {
      console.log(error.message);
      if (error.message === "Firebase: Error (auth/invalid-credential).") {
        alert("Email not registered. Please register.");
      }
      console.error("Authentication error", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl mb-4 font-medium">{isRegister ? "Register" : "Login"}</h1>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        value={userDetails.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        value={userDetails.password}
        onChange={handleChange}
      />
      <button
        onClick={handleAuth}
        className="w-full p-2 bg-blue-500 border rounded-lg text-white"
      >
        {isRegister ? "Register" : "Login"}
      </button>
      <p
        className="mt-4 text-sky-500 cursor-pointer"
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </p>
    </div>
  );
};

export default Auth;
