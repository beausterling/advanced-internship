"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import loginImage from "@/assets/login.png";
import { Book } from "@/types/book";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { openModal } from "@/redux/modalSlice";

export default function PlayerPage() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getBook() {
      const res = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
      );
      const text = await res.text();
      setBook(text ? JSON.parse(text) : null);
    }
    getBook();
  }, [id]);

  if (!book) return null;

  return (
    <div className="audio__book--summary">
      <div className="audio__book--summary-title">{book.title}</div>
      {user.uid ? (
        <div className="audio__book--summary-text">{book.summary}</div>
      ) : (
        <div className="settings__login--wrapper">
          <Image src={loginImage} alt="login" />
          <div className="settings__login--text">
            Log in to your account to read and listen to the book
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
  );
}
