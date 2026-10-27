"use client";

import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { AiOutlineClose } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import googleIcon from "@/assets/google.png";
import { auth } from "@/firebase/init";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeModal } from "@/redux/modalSlice";

function getErrorMessage(error: unknown) {
  const code = error instanceof FirebaseError ? error.code : "";
  switch (code) {
    case "auth/invalid-email":
      return "Invalid email";
    case "auth/missing-password":
      return "Please enter a password";
    case "auth/weak-password":
      return "Password should be at least 6 characters";
    case "auth/email-already-in-use":
      return "Email is already in use";
    case "auth/user-not-found":
      return "User not found";
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "Incorrect email or password";
    case "auth/popup-closed-by-user":
      return "";
    default:
      return "Something went wrong, please try again";
  }
}

export default function AuthModal() {
  const isOpen = useAppSelector((state) => state.modal.isOpen);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function onSuccess() {
    dispatch(closeModal());
    if (pathname === "/") {
      router.push("/for-you");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onSuccess();
    } catch (err) {
      setError(getErrorMessage(err));
    }
    setLoading(false);
  }

  async function guestLogin() {
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(
        auth,
        process.env.NEXT_PUBLIC_GUEST_EMAIL as string,
        process.env.NEXT_PUBLIC_GUEST_PASSWORD as string
      );
      onSuccess();
    } catch (err) {
      setError(getErrorMessage(err));
    }
    setLoading(false);
  }

  async function googleLogin() {
    setError("");
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      onSuccess();
    } catch (err) {
      setError(getErrorMessage(err));
    }
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
              <button
                className="btn guest__btn--wrapper"
                onClick={guestLogin}
                disabled={loading}
              >
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
          <button className="btn google__btn--wrapper" onClick={googleLogin}>
            <figure className="google__icon--mask">
              <Image src={googleIcon} alt="google" />
            </figure>
            <div>{isSignUp ? "Sign up with Google" : "Login with Google"}</div>
          </button>
          <div className="auth__separator">
            <span className="auth__separator--text">or</span>
          </div>
          <form className="auth__main--form" onSubmit={handleSubmit}>
            {error && <div className="auth__error">{error}</div>}
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
          onClick={() => {
            setIsSignUp(!isSignUp);
            setError("");
          }}
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
