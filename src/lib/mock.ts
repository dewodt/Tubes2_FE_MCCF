// Mock data before the API is implemented
import type { ResultResponse } from "../types/api";

export const mockResultResponse: ResultResponse = {
  totalTraversed: 500,
  shortestPathLength: 5,
  duration: 5.73,
  articles: [
    {
      id: "Q1",
      title: "Cars (film)",
      description: "2006 American computer-animated comedy film",
      thumbnail: "https://en.wikipedia.org/wiki/Cars_(film)",
      url: "https://en.wikipedia.org/wiki/Cars_(film)",
    },
    {
      id: "Q2",
      title: "Cars 2",
      description: "2011 American computer-animated spy action comedy film",
      thumbnail: "https://en.wikipedia.org/wiki/Cars_2",
      url: "https://en.wikipedia.org/wiki/Cars_2",
    },
    {
      id: "Q3",
      title: "Cars 3",
      description: "2017 American computer-animated comedy film",
      thumbnail: "https://en.wikipedia.org/wiki/Cars_3",
      url: "https://en.wikipedia.org/wiki/Cars_3",
    },
    {
      id: "Q4",
      title: "Cars (franchise)",
      description: "Media franchise created by Pixar and owned by Disney",
      thumbnail: "https://en.wikipedia.org/wiki/Cars_(franchise)",
      url: "https://en.wikipedia.org/wiki/Cars_(franchise)",
    },
    {
      id: "Q5",
      title: "Cars (video game)",
      description: "2006 racing video game",
      thumbnail: "https://en.wikipedia.org/wiki/Cars_(video_game)",
      url: "https://en.wikipedia.org/wiki/Cars_(video_game)",
    },
    {
      id: "Q6",
      title: "Cars (soundtrack)",
      description: "Soundtrack album for the film",
      thumbnail: "https://en.wikipedia.org/wiki/Cars_(soundtrack)",
      url: "https://en.wikipedia.org/wiki/Cars_(soundtrack)",
    },
    {
      id: "Q7",
      title: "Twitter",
      description: "Social media platform",
      thumbnail: "https://en.wikipedia.org/wiki/Twitter",
      url: "https://en.wikipedia.org/wiki/Twitter",
    },
    {
      id: "Q8",
      title: "Facebook",
      description: "Social media platform",
      thumbnail: "https://en.wikipedia.org/wiki/Facebook",
      url: "https://en.wikipedia.org/wiki/Facebook",
    },
    {
      id: "Q9",
      title: "Instagram",
      description: "Social media platform",
      thumbnail: "https://en.wikipedia.org/wiki/Instagram",
      url: "https://en.wikipedia.org/wiki/Instagram",
    },
    {
      id: "Q10",
      title: "TikTok",
      description: "Social media platform",
      thumbnail: "https://en.wikipedia.org/wiki/TikTok",
      url: "https://en.wikipedia.org/wiki/TikTok",
    },
    {
      id: "Q11",
      title: "Social Media",
      description: "Internet-based communication tools",
      thumbnail: "https://en.wikipedia.org/wiki/Social_media",
      url: "https://en.wikipedia.org/wiki/Social_media",
    },
  ],
  paths: [
    [0, 5, 4, 3],
    [0, 1, 2, 3],
    [0, 10, 8, 3],
    [0, 7, 6, 3],
  ],
};
