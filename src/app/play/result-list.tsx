"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import type { Article } from "@/types/api";
import { FileText } from "lucide-react";
import Link from "next/link";

interface ResultListProps {
  data: Article[]; // Article data in the path
}

const ResultList = ({ data }: ResultListProps) => {
  return (
    <div className="flex w-full max-w-96 flex-col overflow-hidden rounded-lg border border-border">
      {data.map((article, idx) => {
        return (
          <>
            <Link key={article.id} href={article.url} target="_blank">
              <article className="flex h-[72px] flex-row items-center gap-2 p-2 transition-colors duration-150 ease-in-out hover:bg-muted">
                {/* Image Preview */}
                <Avatar className="size-[50px] rounded-md border border-border">
                  <AvatarImage
                    width={50}
                    height={50}
                    sizes="50px"
                    className="size-full object-cover object-center"
                    src={article.thumbnail}
                  />
                  <AvatarFallback className="size-full rounded-md">
                    <FileText className="size-6 stroke-gray-500 stroke-2" />
                  </AvatarFallback>
                </Avatar>

                {/* Title & Description */}
                <div className="flex flex-col gap-1 text-start">
                  <p className="text-sm font-medium leading-none">
                    {article.title}
                  </p>
                  <p className="line-clamp-2 text-xs text-muted-foreground">
                    {article.description}
                  </p>
                </div>
              </article>
            </Link>

            {idx < data.length - 1 && <Separator />}
          </>
        );
      })}
    </div>
  );
};

export { ResultList };
