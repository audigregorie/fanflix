export type MediaItem = {
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;

  // Optional fields for movies
  title?: string;
  original_title?: string;
  release_date?: string;

  // Optional fields for TV shows
  name?: string;
  original_name?: string;
  first_air_date?: string;

  // Fields for Movie details
  revenue?: number;
  runtime?: string;
  status?: string;
  genres?: Genre[];
};

export type MediaItemsDto = {
  page: number;
  results: MediaItem[];
  total_pages: number;
  total_results: number;
};

export type Genre = {
  id: string;
  name: string;
};

export type GenresDto = {
  genres: Genre[];
};

// Function to map API data to MediaItem
export function mapApiDataToMediaItem(apiData: any, mediaType: 'movie' | 'tv'): MediaItem {
  return {
    ...apiData,
    title: mediaType === 'movie' ? apiData.title : apiData.name, // Map movie/tv to tite/name
    original_title: mediaType === 'movie' ? apiData.original_title : apiData.original_name, // Map movie/tv to original title/original name
    release_date: mediaType === 'movie' ? apiData.release_date : apiData.first_air_date, // Map movie/tv to release/first air date
  };
}

// Function to map an array of API data to MediaItem[]
export function mapApiDataArrayToMediaItems(apiDataArray: any[], mediaType: 'movie' | 'tv'): MediaItem[] {
  return apiDataArray.map((item) => mapApiDataToMediaItem(item, mediaType));
}
