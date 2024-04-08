import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { queryClient } from "@/lib/query";
import { PlayFormSchema } from "@/lib/zod";
import type { Article } from "@/types/api";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useQuery } from "@tanstack/react-query";
import { CircleAlert, FileText, Loader2 } from "lucide-react";
import * as React from "react";
import { UseFormSetValue } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import * as z from "zod";

// Custom props for Wikipedia Input
export interface WikipediaInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: keyof z.infer<typeof PlayFormSchema>; // Form Field Name
  value: string;
  setValue: UseFormSetValue<z.infer<typeof PlayFormSchema>>; // For updating form value & auto-completion value
}

// Recommendation data structure
type Recommendation = Omit<Article, "url">;

// Fetch recommendations from Wikipedia API
const recommendationFetcher = async (
  search: string,
): Promise<Recommendation[]> => {
  const url = `
    https://en.wikipedia.org/w/api.php?
      action=query&
      format=json&
      gpssearch=${search}&
      generator=prefixsearch&
      prop=pageprops%7Cpageimages%7Cpageterms&
      redirects=&
      ppprop=displaytitle&
      piprop=thumbnail&
      pithumbsize=160&
      pilimit=30&
      wbptterms=description&
      gpsnamespace=0&
      gpslimit=5&
      origin=*`;

  const res = await fetch(url, { method: "GET" });
  if (!res.ok) {
    throw new Error("Failed to fetch recommendations");
  }

  const data = await res.json();

  // Initialize recommendations array
  const recommendations: Recommendation[] = [];

  if (data.query && data.query.pages) {
    for (const pageId in data.query.pages) {
      const page = data.query.pages[pageId];
      recommendations.push({
        id: page.pageid,
        title: page.title as string,
        description: page.terms?.description?.[0] ?? "",
        thumbnail: page.thumbnail?.source ?? "",
      });
    }
  }

  // If no recommendation, will return empty array
  return recommendations;
};

const WikipediaInput = React.forwardRef<HTMLInputElement, WikipediaInputProps>(
  ({ className, value, setValue, name, ...props }, ref) => {
    // Debounced text state (for fetching recommendations)
    const [debouncedText, setDebouncedText] = React.useState<string>("");

    // Debouncer function
    const debounce = useDebouncedCallback(
      (newText: string) => setDebouncedText(newText),
      500,
    );

    // Recommendation Popup Ref
    const popupRef = React.useRef<HTMLDivElement>(null);

    // Popup active/inactive state
    const [isPopupActive, setIsPopupActive] = React.useState<boolean>(false);

    /* 
      Recommendations state fetched from Wikipedia API 
      1. undefined => empty input / loading / error
      2. [] => no recommendations found
      3. isPending => loading
      4. isError => error
      5. other => recommendation[]
    */
    const [recommendations, setRecommendations] = React.useState<
      Recommendation[] | undefined
    >();

    // Query hook for fetching recommendations
    const { data, isError, isPending } = useQuery(
      {
        queryKey: ["wikipedia", debouncedText],
        queryFn: async () => {
          const res = await recommendationFetcher(debouncedText);
          return res;
        },
        enabled: debouncedText.length > 0, // Disable query when input is empty string
      },
      queryClient,
    );

    // Update recommendations state based on query result changes
    React.useEffect(() => {
      if (isError || isPending) {
        setRecommendations(undefined);
      } else {
        setRecommendations(data);
      }
    }, [data, isError, isPending]);

    return (
      <div className="relative">
        {/* Input Field */}
        <Input
          className={className}
          ref={ref}
          value={value}
          autoComplete="off"
          onChange={(e) => {
            // Update the form value
            setValue(name, e.target.value); // Update the value

            // Clear recommendations
            if (!e.target.value) {
              setRecommendations(undefined);
              setIsPopupActive(false);
              return;
            }

            // Trigger recommendations
            setIsPopupActive(true);
            debounce(e.target.value);
          }}
          onBlur={(e) => {
            // If the related target is the popup
            if (popupRef.current?.contains(e.relatedTarget as Node)) {
              return;
            }

            // Else, hide recommendations
            setIsPopupActive(false);
            setRecommendations(undefined);
          }}
          onFocus={async (e) => {
            // Field empty
            if (!e.target.value) {
              return;
            }

            // Trigger recommendations on focus
            setIsPopupActive(true);
            if (e.target.value === debouncedText) {
              // Set recommendations from current query result
              setRecommendations(data);
            } else {
              // Trigger new query
              debounce(e.target.value);
            }
          }}
          {...props} // Other props
        />

        {/* Recommendations Popup */}
        {isPopupActive && (isPending || isError || recommendations) && (
          <div
            className="absolute top-12 z-30 w-full overflow-hidden rounded-md border border-border bg-background"
            ref={popupRef}
          >
            {/* Loading State */}
            {isPending ? (
              <div className="flex flex-row items-center justify-center gap-2 p-4 text-muted-foreground">
                <Loader2 className="size-4 flex-none animate-spin" />
                <p className="text-sm">Loading...</p>
              </div>
            ) : isError ? (
              <div className="flex flex-row items-center justify-center gap-2 p-4 text-destructive">
                <CircleAlert className="size-4 flex-none" />
                <p className="text-sm">Error</p>
              </div>
            ) : recommendations && recommendations.length === 0 ? (
              <div className="flex flex-row items-center justify-center gap-2 p-4 text-muted-foreground">
                <CircleAlert className="size-4 flex-none" />
                <p className="text-sm">Not found</p>
              </div>
            ) : (
              recommendations &&
              recommendations.map((recommendation, idx) => {
                return (
                  <>
                    <button
                      key={recommendation.id}
                      type="button"
                      className="flex h-[72px] w-full flex-row items-center gap-2 p-2 transition-colors duration-150 ease-in-out hover:bg-muted"
                      onClick={() => {
                        // Close recommendations
                        setIsPopupActive(false);
                        setRecommendations(undefined);

                        // Update the form value
                        setValue(name, recommendation.title);
                      }}
                    >
                      {/* Image Preview */}
                      <Avatar className="size-[50px] rounded-md border border-border">
                        <AvatarImage
                          className="size-full object-cover object-center"
                          src={recommendation.thumbnail}
                        />
                        <AvatarFallback className="size-full rounded-md">
                          <FileText className="size-6 stroke-gray-500 stroke-2" />
                        </AvatarFallback>
                      </Avatar>

                      {/* Title & Description */}
                      <div className="flex flex-col gap-1 text-start">
                        <p className="text-sm font-medium leading-none">
                          {recommendation.title}
                        </p>
                        <p className="line-clamp-2 text-xs text-muted-foreground">
                          {recommendation.description}
                        </p>
                      </div>
                    </button>

                    {idx < recommendations.length - 1 && <Separator />}
                  </>
                );
              })
            )}
          </div>
        )}
      </div>
    );
  },
);

WikipediaInput.displayName = "WikipediaInput";

export { WikipediaInput };
