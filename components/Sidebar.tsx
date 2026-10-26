"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { RiBallPenLine } from "react-icons/ri";
import { FiHelpCircle, FiLogIn, FiLogOut, FiSettings } from "react-icons/fi";
import logo from "@/assets/logo.png";
import { auth } from "@/firebase/init";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { openModal } from "@/redux/modalSlice";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  function handleAuthClick() {
    if (user.uid) {
      signOut(auth);
    } else {
      dispatch(openModal());
    }
    onClose();
  }

  return (
    <>
      <div
        className={`sidebar__overlay ${isOpen ? "" : "sidebar__overlay--hidden"}`}
        onClick={onClose}
      ></div>
      <div
        className={`sidebar ${isOpen ? "sidebar--opened" : ""} ${
          pathname.startsWith("/player") && user.uid ? "sidebar--player" : ""
        }`}
      >
        <div className="sidebar__logo">
          <Image src={logo} alt="logo" />
        </div>
        <div className="sidebar__wrapper">
          <div className="sidebar__top">
            <Link
              href="/for-you"
              className="sidebar__link--wrapper"
              onClick={onClose}
            >
              <div
                className={`sidebar__link--line ${
                  pathname === "/for-you" ? "sidebar__link--line--active" : ""
                }`}
              ></div>
              <div className="sidebar__icon--wrapper">
                <AiOutlineHome />
              </div>
              <div className="sidebar__link--text">For you</div>
            </Link>
            <div className="sidebar__link--wrapper sidebar__link--not-allowed">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <BsBookmark />
              </div>
              <div className="sidebar__link--text">My Library</div>
            </div>
            <div className="sidebar__link--wrapper sidebar__link--not-allowed">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <RiBallPenLine />
              </div>
              <div className="sidebar__link--text">Highlights</div>
            </div>
            <div className="sidebar__link--wrapper sidebar__link--not-allowed">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <AiOutlineSearch />
              </div>
              <div className="sidebar__link--text">Search</div>
            </div>
          </div>
          <div className="sidebar__bottom">
            <Link
              href="/settings"
              className="sidebar__link--wrapper"
              onClick={onClose}
            >
              <div
                className={`sidebar__link--line ${
                  pathname === "/settings" ? "sidebar__link--line--active" : ""
                }`}
              ></div>
              <div className="sidebar__icon--wrapper">
                <FiSettings />
              </div>
              <div className="sidebar__link--text">Settings</div>
            </Link>
            <div className="sidebar__link--wrapper sidebar__link--not-allowed">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <FiHelpCircle />
              </div>
              <div className="sidebar__link--text">Help & Support</div>
            </div>
            <div className="sidebar__link--wrapper" onClick={handleAuthClick}>
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                {user.uid ? <FiLogOut /> : <FiLogIn />}
              </div>
              <div className="sidebar__link--text">
                {user.uid ? "Logout" : "Login"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
