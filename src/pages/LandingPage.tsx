import { useState } from "react";
import type { ToggleItem } from "@/types";
import { Card, Category, Singer, Song, Toggle } from "@/components";
import { useTotalSongCount } from "@/hooks";
import { INFO_CARD_GROUPS } from "@/constants";
import { useSearchStore } from "@/stores/searchStore";

export default function LandingPage() {
  const { data: totalCount } = useTotalSongCount();
  const [toggle, setToggle] = useState<ToggleItem["type"]>("song");
  const { searchQuery, setSearchQuery } = useSearchStore();

  const infoCardGroups = INFO_CARD_GROUPS(totalCount ?? 0);

  return (
    <>
      <header className="relative flex h-auto min-h-[200px] sm:h-130 flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_30%_20%,rgba(255,107,107,0.2)_0%,transparent_100%),radial-gradient(circle_at_70%_80%,rgba(78,205,196,0.3)_0%,transparent_100%)] py-8 sm:py-0">
        <div className="mb-6 sm:mb-13 flex flex-col items-center justify-center gap-2 sm:gap-3 px-4">
          <h1 className="gradient-text mb-2 sm:mb-4 text-2xl sm:text-3xl md:text-4xl">✨온유ONU 노래책</h1>
          <p className="text-xs sm:text-[15px] font-light text-[#718096]">Dearz</p>
        </div>
        <div className="grid grid-cols-1 sm:flex sm:items-center sm:justify-center gap-4 px-4 w-full sm:w-auto">
          {infoCardGroups.map((infoCardGroup) => (
            <Card
              key={infoCardGroup.title}
              type="infoCardGroup"
              data={{ data: infoCardGroup }}
            />
          ))}
        </div>
        <div className="mt-6 sm:mt-8 px-4 w-full flex flex-col items-center gap-5">
          <Toggle toggle={toggle} setToggle={setToggle} />
          <div className="w-full max-w-lg">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <svg
                  className="h-5 w-5 text-gray-400 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="제목, 가수, 태그 검색..."
                className="w-full rounded-full border border-blue-200/60 bg-white/80 backdrop-blur-sm py-3.5 pr-4 pl-11 text-sm text-gray-700 placeholder:text-gray-400 shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-md focus:border-blue-400 focus:bg-white focus:shadow-lg focus:ring-2 focus:ring-blue-200/50 focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-20 bg-linear-to-b from-transparent to-white" />
      </header>
      <main className="mb-25 flex flex-col items-center justify-center">
        {toggle === "song" && <Song />}
        {toggle === "category" && <Category />}
        {toggle === "singer" && <Singer />}
      </main>
    </>
  );
}
