"use client";

import Image from "next/image";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import googleIcon from "@/assets/google.png";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeModal } from "@/redux/modalSlice";

export default function AuthModal() {
  const isOpen = useAppSelector((state) => state.modal.isOpen);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  return (
    <div className="auth__wrapper" onClick={() => dispatch(closeModal())}>
      <div className="auth" onClick={(e) => e.stopPropagation()}>
        <div className="auth__content">
          <div className="auth__title">Log in to Summarist</div>
          <button className="btn guest__btn--wrapper">
            <figure className="google__icon--mask guest__icon--mask">
              <FaUser />
            </figure>
            <div>Login as a Guest</div>
          </button>
          <div className="auth__separator">
            <span className="auth__separator--text">or</span>
          </div>
          <button className="btn google__btn--wrapper">
            <figure className="google__icon--mask">
              <Image src={googleIcon} alt="google" />
            </figure>
            <div>Login with Google</div>
          </button>
          <div className="auth__separator">
            <span className="auth__separator--text">or</span>
          </div>
          <form className="auth__main--form">
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
            <button className="btn" type="submit">
              Login
            </button>
          </form>
        </div>
        <button className="auth__switch--btn">Don&apos;t have an account?</button>
        <div className="auth__close--btn" onClick={() => dispatch(closeModal())}>
          <AiOutlineClose />
        </div>
      </div>
    </div>
  );
}
