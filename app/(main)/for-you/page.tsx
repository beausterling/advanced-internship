"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { Book } from "@/types/book";
import BookCard from "@/components/BookCard";

const API_URL = "https://us-central1-summaristt.cloudfunctions.net/getBooks";

export default function ForYou() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);

  useEffect(() => {
    async function getBooks() {
      const selectedRes = await fetch(`${API_URL}?status=selected`);
      const selectedData = await selectedRes.json();
      setSelectedBook(selectedData[0]);

      const recommendedRes = await fetch(`${API_URL}?status=recommended`);
      setRecommendedBooks(await recommendedRes.json());
    }
    getBooks();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="for-you__title">Selected just for you</div>
        {selectedBook && (
          <Link href={`/book/${selectedBook.id}`} className="selected__book">
            <div className="selected__book--sub-title">
              {selectedBook.subTitle}
            </div>
            <div className="selected__book--line"></div>
            <div className="selected__book--content">
              <figure className="selected__book--img-mask">
                <Image
                  className="selected__book--img"
                  src={selectedBook.imageLink}
                  alt={selectedBook.title}
                  width={140}
                  height={140}
                />
              </figure>
              <div className="selected__book--text">
                <div className="selected__book--title">
                  {selectedBook.title}
                </div>
                <div className="selected__book--author">
                  {selectedBook.author}
                </div>
                <div className="selected__book--duration-wrapper">
                  <div className="selected__book--icon">
                    <BsFillPlayFill />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}
        <div className="for-you__title">Recommended For You</div>
        <div className="for-you__sub--title">We think you&apos;ll like these</div>
        <div className="for-you__books">
          {recommendedBooks.map((book) => (
            <BookCard book={book} key={book.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
