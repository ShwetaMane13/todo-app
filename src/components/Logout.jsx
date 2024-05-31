"use client";

import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { clearUser } from "@/slices/authSlice";

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(clearUser());
  };

  return (
    <section className="flex justify-end">
      <button
        onClick={handleLogout}
        className="w-24 p-3 bg-red-500 text-white font-medium border rounded-md"
      >
        Logout
      </button>
    </section>
  );
};

export default Logout;
