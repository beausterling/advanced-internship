"use client";

import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Book } from "@/types/book";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    // the api hangs when the search is empty so only call it when there's text
    if (!search) return;

    const timer = setTimeout(async () => {
      const res = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(search)}`
      );
      const data = await res.json();
      setBooks(data);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  function handleChange(value: string) {
    setSearch(value);
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
                <AiOutlineSearch />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
