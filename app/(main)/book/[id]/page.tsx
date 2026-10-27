"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineClockCircle, AiOutlineStar } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { HiOutlineLightBulb, HiOutlineMicrophone } from "react-icons/hi";
import { VscBook } from "react-icons/vsc";
import { Book } from "@/types/book";
import { db } from "@/firebase/init";
import Skeleton from "@/components/Skeleton";
import BookDuration from "@/components/BookDuration";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { openModal } from "@/redux/modalSlice";

export default function BookPage() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function getBook() {
      const res = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
      );
      // the api sends back an empty body when the id doesn't exist
      const text = await res.text();
      setBook(text ? JSON.parse(text) : null);
      setLoading(false);
    }
    getBook();
  }, [id]);

  useEffect(() => {
    if (!user.uid) return;
    getDoc(doc(db, "users", user.uid, "library", id))
      .then((snapshot) => setSaved(snapshot.exists()))
      .catch((error) => console.log(error));
  }, [user.uid, id]);

  async function handleLibrary() {
    if (!user.uid) {
      dispatch(openModal());
      return;
    }
    const bookRef = doc(db, "users", user.uid, "library", id);
    try {
      if (saved) {
        await deleteDoc(bookRef);
        setSaved(false);
      } else {
        await setDoc(bookRef, book);
        setSaved(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleReadOrListen() {
    if (user.isLoading) return;
    if (!user.uid) {
      dispatch(openModal());
    } else if (book?.subscriptionRequired && user.plan === "basic") {
      router.push("/choose-plan");
    } else {
      router.push(`/player/${id}`);
    }
  }

  if (loading) {
    return (
      <div className="container">
        <div className="row">
          <div className="inner__wrapper">
            <div className="inner__book">
              <Skeleton width="70%" height="40px" className="skeleton__line" />
              <Skeleton width="30%" height="24px" className="skeleton__line" />
              <Skeleton width="60%" height="24px" className="skeleton__line" />
              <Skeleton height="96px" className="skeleton__line" />
              <Skeleton
                width="300px"
                height="48px"
                className="skeleton__line"
              />
              <Skeleton width="50%" height="24px" className="skeleton__line" />
              <Skeleton height="200px" />
            </div>
            <Skeleton
              width="300px"
              height="300px"
              className="inner-book__img--mask"
            />
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container">
        <div className="row">
          <div className="inner-book__title">Book not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="inner__wrapper">
          <div className="inner__book">
            <div className="inner-book__title">
              {book.title}
              {book.subscriptionRequired &&
                user.plan === "basic" &&
                " (Premium)"}
            </div>
            <div className="inner-book__author">{book.author}</div>
            <div className="inner-book__sub--title">{book.subTitle}</div>
            <div className="inner-book__wrapper">
              <div className="inner-book__description--wrapper">
                <div className="inner-book__description">
                  <AiOutlineStar className="inner-book__icon" />
                  {book.averageRating} ({book.totalRating} ratings)
                </div>
                <div className="inner-book__description">
                  <AiOutlineClockCircle className="inner-book__icon" />
                  <BookDuration audioLink={book.audioLink} />
                </div>
                <div className="inner-book__description">
                  <HiOutlineMicrophone className="inner-book__icon" />
                  {book.type}
                </div>
                <div className="inner-book__description">
                  <HiOutlineLightBulb className="inner-book__icon" />
                  {book.keyIdeas} Key ideas
                </div>
              </div>
            </div>
            <div className="inner-book__read--btn-wrapper">
              <button
                className="inner-book__read--btn"
                onClick={handleReadOrListen}
              >
                <VscBook className="inner-book__read--icon" />
                Read
              </button>
              <button
                className="inner-book__read--btn"
                onClick={handleReadOrListen}
              >
                <HiOutlineMicrophone className="inner-book__read--icon" />
                Listen
              </button>
            </div>
            <div className="inner-book__bookmark" onClick={handleLibrary}>
              {user.uid && saved ? (
                <>
                  <BsBookmarkFill className="inner-book__bookmark--icon" />
                  Saved in My Library
                </>
              ) : (
                <>
                  <BsBookmark className="inner-book__bookmark--icon" />
                  Add title to My Library
                </>
              )}
            </div>
            <div className="inner-book__secondary--title">
              What&apos;s it about?
            </div>
            <div className="inner-book__tags--wrapper">
              {book.tags.map((tag) => (
                <div className="inner-book__tag" key={tag}>
                  {tag}
                </div>
              ))}
            </div>
            <div className="inner-book__book--description">
              {book.bookDescription}
            </div>
            <div className="inner-book__secondary--title">About the author</div>
            <div className="inner-book__author--description">
              {book.authorDescription}
            </div>
          </div>
          <figure className="inner-book__img--mask">
            <Image
              className="inner-book__img"
              src={book.imageLink}
              alt={book.title}
              width={300}
              height={300}
            />
          </figure>
        </div>
      </div>
    </div>
  );
}
