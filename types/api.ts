// Wikipedia Article Data Structure
export interface Article {
  id: number; // Article ID
  title: string; // Article Title
  description: string; // Article Description
  thumbnail: string; // Article Thumbnail (wikipedia image url)
  url: string; // Article URL (wikipedia page url)
}

// Path Data Structure (simple array of numbers)
// Each number represents the index from the articles: Article[] array.
// example: const path: Path = [0, 5, 4, 3] represents articles[0]->articles[5]->articles[4]->articles[3]
export type Path = number[];

// Result Response Data Structure
export interface ResultResponse {
  totalTraversed: number; // Total article traversed
  shortestPathLength: number; // Shortest path length
  duration: number; // Duration of the search
  articles: Article[]; // Articles data used in paths: Path[]
  paths: Path[]; // List of the shortest paths from start to target found
}
