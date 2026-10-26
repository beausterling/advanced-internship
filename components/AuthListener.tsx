"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/init";
import { useAppDispatch } from "@/redux/hooks";
import { logoutUser, setUser } from "@/redux/userSlice";

export default function AuthListener() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({ uid: user.uid, email: user.email }));
      } else {
        dispatch(logoutUser());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return null;
}
