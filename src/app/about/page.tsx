import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | WikiRace",
};

const AboutPage = () => {
  return (
    <main className="flex flex-auto flex-col items-center justify-center p-6 py-12 sm:p-12 lg:p-24">
      {/* Contact Me */}
      <section className="max-w-2xl">
        <Card className="flex flex-col gap-2 p-8 shadow-lg lg:gap-5 lg:p-10">
          <CardHeader className="p-0">
            <h1 className="text-center text-2xl font-bold leading-none lg:text-4xl lg:leading-none">
              About WikiRace
            </h1>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-justify text-base lg:text-xl">
              WikiRace is a game where player navigate from one Wikipedia page
              to another using only internal links. We use BFS and IDS algorithm
              to solve the game. This project is made to fulfill second big
              assignment of Algorithm Strategy. This project is open source and
              can be accessed from{" "}
              <Link
                href="https://github.com/dewodt/Tubes2_FE_MCCF"
                target="_blank"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                FE Repository
              </Link>{" "}
              and{" "}
              <Link
                href="https://github.com/dewodt/Tubes2_BE_MCCF"
                target="_blank"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                BE Repository
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default AboutPage;
