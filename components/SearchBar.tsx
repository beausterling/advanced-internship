"use client";

import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBar() {
  const [search, setSearch] = useState("");

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
                onChange={(e) => setSearch(e.target.value)}
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
