"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/assets/logo.png";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { openModal } from "@/redux/modalSlice";

export default function Nav() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.user);

  function handleLogin() {
    if (user.uid) {
      router.push("/for-you");
    } else {
      dispatch(openModal());
    }
  }

  return (
    <nav className="nav">
      <div className="nav__wrapper">
        <figure className="nav__img--mask">
          <Image className="nav__img" src={logo} alt="logo" />
        </figure>
        <ul className="nav__list--wrapper">
          <li
            className="nav__list nav__list--login"
            onClick={handleLogin}
          >
            Login
          </li>
          <li className="nav__list nav__list--mobile">About</li>
          <li className="nav__list nav__list--mobile">Contact</li>
          <li className="nav__list nav__list--mobile">Help</li>
        </ul>
      </div>
    </nav>
  );
}
