"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { Book } from "@/types/book";

export default function SearchBar({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // the api hangs when the search is empty so only call it when there's text
    if (!search) return;

    const timer = setTimeout(async () => {
      const res = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(search)}`,
      );
      const data = await res.json();
      setBooks(data);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  function handleChange(value: string) {
    setSearch(value);
    setLoading(value !== "");
    if (!value) {
      setBooks([]);
    }
  }

  return (
    <div className="search__background">
      <div className="search__wrapper">
        <div className="search__content">
          <div className="search">
            <div className="search__input--wrapper">
              <input
                className="search__input"
                type="text"
                placeholder="Search for books"
                value={search}
                onChange={(e) => handleChange(e.target.value)}
              />
              <div className="search__icon">
                {search ? (
                  <AiOutlineClose
                    className="search__delete--icon"
                    onClick={() => handleChange("")}
                  />
                ) : (
                  <AiOutlineSearch />
                )}
              </div>
            </div>
          </div>
          <div className="sidebar__toggle--btn" onClick={onMenuClick}>
            <AiOutlineMenu />
          </div>
        </div>
        {search && (
          <div className="search__books--wrapper">
            {loading ? (
              new Array(4)
                .fill(0)
                .map((_, index) => (
                  <div
                    className="search__book--skeleton skeleton"
                    key={index}
                  ></div>
                ))
            ) : books.length === 0 ? (
              <div className="search__empty">No books found</div>
            ) : (
              books.map((book) => (
                <Link
                  href={`/book/${book.id}`}
                  className="search__book--link"
                  key={book.id}
                  onClick={() => handleChange("")}
                >
                  <figure className="search__book--img-mask">
                    <Image
                      className="search__book--img"
                      src={book.imageLink}
                      alt={book.title}
                      width={80}
                      height={80}
                    />
                  </figure>
                  <div>
                    <div className="search__book--title">{book.title}</div>
                    <div className="search__book--author">{book.author}</div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
