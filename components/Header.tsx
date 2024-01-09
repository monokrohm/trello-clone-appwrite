"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import Avatar from "react-avatar";
import fetchSuggestion from "@/util/fetchSuggestion";
import { useBoardStore } from "@/store/BoardStore";

function Header() {
  const [board, searchString, setSearchString] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString,
  ]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [suggestion, setSuggestion] = useState<string>("");

  useEffect(() => {
    if (board.columns.size === 0) return;
    setLoading(true);

    const fetchSuggestionFunction = async () => {
      const suggestion = await fetchSuggestion(board);
      setSuggestion(suggestion);
      setLoading(false);
    };

    fetchSuggestionFunction();
  }, [board]);

  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">
        <div
          className="
                    absolute
                    top-0
                    left-0
                    w-full
                    h-96
                    rounded-md
                    bg-gradient-to-br
                    from-pink-400
                    to-[#0055D1]
                    filter
                    blur-3xl
                    opacity-50
                    -z-50
                    "
        />

        <Image
          src="/images/trello_logo.png"
          alt="Trello Logo"
          width={300}
          height={100}
          className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
        />
        <div className="flex flex-1 justify-end items-center space-x-5 w-full">
          <form className="flex flex-1 md:flex-initial items-center space-x-5 p-2 rounded-md bg-white shadow-md">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              className="flex-1 outline-none p-2"
            />
            <button type="submit" hidden>
              Search
            </button>
          </form>
          <Avatar name="Ray" round size="50" color="#0055D1" />
        </div>
      </div>
      <div className="flex items-center justify-center px-5 py-2 md:py-5">
        <p
          className="flex items-center p-5 pr-5 w-fit max-w-3xl rounded-xl text-sm font-normal italic 
                shadow-xl bg-white text-[#0055D1]"
        >
          <UserCircleIcon
            className={`inline-block h-10 w-10 text-[#0055D1] mr-1
            ${loading && "animate-spin"}
          `}
          />
          {suggestion && !loading ? suggestion : "Summarising your tasks..."}
        </p>
      </div>
    </header>
  );
}

export default Header;
