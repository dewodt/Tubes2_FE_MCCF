"use client";

import type { Article } from "@/types/api";
import Link from "next/link";

interface ResultMessageProps {
  totalTraversed: number;
  duration: number;
  shortestPathLength: number;
  startArticle: Article;
  endArticle: Article;
}

const ResultMessage = ({
  totalTraversed,
  duration,
  shortestPathLength,
  startArticle,
  endArticle,
}: ResultMessageProps) => {
  return (
    <p className="text-center text-base lg:text-xl">
      Traversed a total of{" "}
      <span className="font-semibold text-primary">
        {totalTraversed} articles
      </span>{" "}
      in{" "}
      <span className="font-semibold text-primary">
        {duration.toFixed(2)} seconds
      </span>{" "}
      where the shortest path from{" "}
      <Link
        href={startArticle.url}
        target="_blank"
        className="font-semibold text-primary underline-offset-4 hover:underline"
      >
        {startArticle.title}
      </Link>{" "}
      to{" "}
      <Link
        href={endArticle.url}
        target="_blank"
        className="font-semibold text-primary  underline-offset-4 hover:underline"
      >
        {endArticle.title}
      </Link>{" "}
      is{" "}
      <span className="font-semibold text-primary">
        {shortestPathLength} articles
      </span>
    </p>
  );
};

export { ResultMessage };
