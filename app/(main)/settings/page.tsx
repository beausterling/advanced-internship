"use client";

import Image from "next/image";
import Link from "next/link";
import loginImage from "@/assets/login.png";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { openModal } from "@/redux/modalSlice";
import Skeleton from "@/components/Skeleton";

export default function Settings() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  return (
    <div className="container">
      <div className="row">
        <div className="section__title page__title">Settings</div>
        {user.isLoading && (
          <>
            <Skeleton width="200px" height="24px" className="skeleton__line" />
            <Skeleton width="100px" height="20px" className="skeleton__line" />
            <Skeleton
              width="180px"
              height="40px"
              className="settings__skeleton--gap"
            />
            <Skeleton width="80px" height="24px" className="skeleton__line" />
            <Skeleton width="240px" height="20px" />
          </>
        )}
        {!user.isLoading && !user.uid && (
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
        {user.uid && (
          <>
            <div className="setting__content">
              <div className="settings__sub--title">Your Subscription plan</div>
              <div className="settings__text">{user.plan}</div>
              {user.plan === "basic" && (
                <Link
                  href="/choose-plan"
                  className="btn settings__upgrade--btn"
                >
                  Upgrade to Premium
                </Link>
              )}
            </div>
            <div className="setting__content">
              <div className="settings__sub--title">Email</div>
              <div className="settings__text">{user.email}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
