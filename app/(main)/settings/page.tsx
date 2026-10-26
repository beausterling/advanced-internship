"use client";

import Image from "next/image";
import loginImage from "@/assets/login.png";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { openModal } from "@/redux/modalSlice";

export default function Settings() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  return (
    <div className="container">
      <div className="row">
        <div className="section__title page__title">Settings</div>
        {!user.uid && (
          <div className="settings__login--wrapper">
            <Image src={loginImage} alt="login" />
            <div className="settings__login--text">
              Log in to your account to see your details.
            </div>
            <button
              className="btn settings__login--btn"
              onClick={() => dispatch(openModal())}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
