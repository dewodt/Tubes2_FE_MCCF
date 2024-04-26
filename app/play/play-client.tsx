"use client";

import { PlayForm } from "./play-form";
import { ResultGraph } from "./result-graph";
import { ResultList } from "./result-list";
import { ResultMessage } from "./result-message";
import type { ResultResponse } from "@/types/api";
import * as React from "react";

const PlayClient = () => {
  /*
   * Result state
   * - undefined: No result yet (loading / error / initial state)
   * - ResultResponse: Result data
   */
  const [result, setResult] = React.useState<ResultResponse | undefined>(
    undefined,
  );

  return (
    <>
      {/* Form Section */}
      <section className="flex w-full max-w-3xl flex-col gap-4 lg:gap-6">
        {/* Title */}
        <h1 className="text-center text-3xl font-bold tracking-wide lg:text-5xl">
          WikiRace
        </h1>

        {/* Form */}
        <PlayForm setResult={setResult} />
      </section>

      {/* Result Section */}
      {result && (
        <section className="flex w-full flex-col items-center gap-8 lg:gap-16">
          {/* Result Message */}
          <div className="flex w-full max-w-2xl flex-col items-center gap-4 lg:gap-6">
            <h2 className="text-center text-xl font-bold tracking-wide lg:text-3xl">
              Information
            </h2>
            <ResultMessage
              totalSolutionFound={result.paths.length}
              totalTraversed={result.totalTraversed}
              duration={result.duration}
              shortestPathLength={result.shortestPathLength - 1}
              startArticle={result.articles[result.paths[0][0]]}
              endArticle={
                result.articles[result.paths[0][result.paths[0].length - 1]]
              }
            />
          </div>

          {/* Result Graph */}
          <div className="flex w-full max-w-3xl flex-col items-center gap-4 lg:gap-6">
            <h2 className="text-center text-xl font-bold tracking-wide lg:text-3xl">
              Graph Visualization
            </h2>
            <ResultGraph articles={result.articles} paths={result.paths} />
          </div>

          {/* Result Lists */}
          <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-4 lg:gap-6">
            <h2 className="text-center text-xl font-bold tracking-wide lg:text-3xl">
              Individual Paths
            </h2>
            <div className="flex w-full flex-row flex-wrap items-center justify-center gap-6 lg:gap-8">
              {result.paths.map((path, idx) => {
                const data = path.map((idx) => result.articles[idx]);
                return <ResultList key={idx} data={data} />;
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default PlayClient;
