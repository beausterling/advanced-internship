"use client";

import Image from "next/image";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { AiOutlineClose } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import googleIcon from "@/assets/google.png";
import { auth } from "@/firebase/init";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeModal } from "@/redux/modalSlice";

export default function AuthModal() {
  const isOpen = useAppSelector((state) => state.modal.isOpen);
  const dispatch = useAppDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      dispatch(closeModal());
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  if (!isOpen) return null;

  return (
    <div className="auth__wrapper" onClick={() => dispatch(closeModal())}>
      <div className="auth" onClick={(e) => e.stopPropagation()}>
        <div className="auth__content">
          <div className="auth__title">
            {isSignUp ? "Sign up to Summarist" : "Log in to Summarist"}
          </div>
          {!isSignUp && (
            <>
              <button className="btn guest__btn--wrapper">
                <figure className="google__icon--mask guest__icon--mask">
                  <FaUser />
                </figure>
                <div>Login as a Guest</div>
              </button>
              <div className="auth__separator">
                <span className="auth__separator--text">or</span>
              </div>
            </>
          )}
          <button className="btn google__btn--wrapper">
            <figure className="google__icon--mask">
              <Image src={googleIcon} alt="google" />
            </figure>
            <div>{isSignUp ? "Sign up with Google" : "Login with Google"}</div>
          </button>
          <div className="auth__separator">
            <span className="auth__separator--text">or</span>
          </div>
          <form className="auth__main--form" onSubmit={handleSubmit}>
            <input
              className="auth__main--input"
              type="text"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="auth__main--input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn" type="submit" disabled={loading}>
              {isSignUp ? "Sign up" : "Login"}
            </button>
          </form>
        </div>
        <button
          className="auth__switch--btn"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
        </button>
        <div className="auth__close--btn" onClick={() => dispatch(closeModal())}>
          <AiOutlineClose />
        </div>
      </div>
    </div>
  );
}
