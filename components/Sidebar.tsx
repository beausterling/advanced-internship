"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { RiBallPenLine } from "react-icons/ri";
import { FiHelpCircle, FiLogIn, FiSettings } from "react-icons/fi";
import logo from "@/assets/logo.png";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <Image src={logo} alt="logo" />
      </div>
      <div className="sidebar__wrapper">
        <div className="sidebar__top">
          <Link href="/for-you" className="sidebar__link--wrapper">
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
          <Link href="/settings" className="sidebar__link--wrapper">
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
          <div className="sidebar__link--wrapper">
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper">
              <FiLogIn />
            </div>
            <div className="sidebar__link--text">Login</div>
          </div>
        </div>
      </div>
    </div>
  );
}
