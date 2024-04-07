import PlayClient from "./play-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Play | WikiRace",
};

const PlayPage = async () => {
  return (
    <main className="flex min-h-[calc(100vh-90px)]  justify-center px-6 py-16 sm:p-12 lg:p-24">
      <PlayClient />
    </main>
  );
};

export default PlayPage;
