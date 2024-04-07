import { Button } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "WikiRace",
};

export default function Home() {
  return (
    <main className="flex flex-auto flex-col">
      {/* Hero Section */}
      <section className="flex min-h-[calc(100vh-90px)] w-full items-center justify-center px-6 py-16 sm:p-12 lg:p-24">
        <div className="flex max-w-7xl flex-col-reverse items-center gap-6 sm:flex-row lg:gap-16">
          {/* Hero Texts */}
          <div className="flex flex-col items-start gap-3 lg:gap-6">
            <h1 className="text-4xl font-bold tracking-wide lg:text-6xl">
              WikiRace.
            </h1>
            <p className="text-base font-normal text-muted-foreground lg:text-xl">
              WikiRace is a game where player navigate from one Wikipedia page
              to another using only internal links. We use BFS and IDS to solve
              the game.
            </p>
            <Link href="/play">
              <Button tabIndex={-1} size="lg">
                Play Now
                <ArrowRightCircle className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Hero Image */}
          <Image
            src="/wikirace-logo.png"
            alt="Image"
            width={400}
            height={400}
            className="w-[200px] lg:w-[420px]"
            priority
          />
        </div>
      </section>
    </main>
  );
}
