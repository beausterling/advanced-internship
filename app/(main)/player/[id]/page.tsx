"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import loginImage from "@/assets/login.png";
import { Book } from "@/types/book";
import AudioPlayer from "@/components/AudioPlayer";
import Skeleton from "@/components/Skeleton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { openModal } from "@/redux/modalSlice";

export default function PlayerPage() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    async function getBook() {
      const res = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
      );
      const text = await res.text();
      setBook(text ? JSON.parse(text) : null);
    }
    getBook();
  }, [id]);

  useEffect(() => {
    if (
      book?.subscriptionRequired &&
      user.uid &&
      !user.isLoading &&
      user.plan === "basic"
    ) {
      router.push("/choose-plan");
    }
  }, [book, user, router]);

  if (!book || user.isLoading) {
    return (
      <div className="audio__book--summary">
        <Skeleton
          width="60%"
          height="36px"
          className="audio__book--summary-title"
        />
        {new Array(8).fill(0).map((_, index) => (
          <Skeleton height="20px" className="skeleton__line" key={index} />
        ))}
      </div>
    );
  }

  return (
    <>
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
      {user.uid && <AudioPlayer book={book} />}
    </>
  );
}
