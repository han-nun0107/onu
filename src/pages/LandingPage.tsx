import { useState } from "react";
import type { ToggleItem } from "@/types";
import { Card, Category, Singer, Song, Toggle } from "@/components";
import { useTotalSongCount } from "@/hooks";
import { INFO_CARD_GROUPS } from "@/constants";

export default function LandingPage() {
  const { data: totalCount } = useTotalSongCount();
  const [toggle, setToggle] = useState<ToggleItem["type"]>("song");

  const infoCardGroups = INFO_CARD_GROUPS(totalCount ?? 0);

  return (
    <>
      <header className="relative flex h-130 flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_30%_20%,rgba(255,107,107,0.2)_0%,transparent_100%),radial-gradient(circle_at_70%_80%,rgba(78,205,196,0.3)_0%,transparent_100%)]">
        <div className="mb-13 flex flex-col items-center justify-center gap-3">
          <h1 className="gradient-text mb-4 text-4xl">✨온유ONU 노래책</h1>
          <p className="text-[15px] font-light text-[#718096]">Dearz</p>
        </div>
        <div className="flex items-center justify-center gap-4">
          {infoCardGroups.map((infoCardGroup) => (
            <Card
              key={infoCardGroup.title}
              type="infoCardGroup"
              data={{ data: infoCardGroup }}
            />
          ))}
        </div>
        <Toggle toggle={toggle} setToggle={setToggle} />
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
