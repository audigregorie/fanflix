import { Movie, MoviesDto } from './movie.type'

// Type for tvshow object
export type Tvshow = {
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  name: string
  vote_average: number
  vote_count: number
  first_air_date: string
}

// Movies data object
export type TvshowsDto = {
  page: number
  results: Tvshow[]
  total_pages: number
  total_results: number
}

// Map the tvshow[] type to ressemble the movie[] type
export function mapToMovies(tvshows: Tvshow[]): Movie[] {
  return tvshows.map((tvshow: Tvshow) => {
    return {
      ...tvshow,
      title: tvshow.name,
      original_title: tvshow.original_name,
    }
  })
}

// Map the tvshow type to ressemble the movie type
export function mapToMovie(tvshow: Tvshow): Movie {
  return {
    ...tvshow,
    title: tvshow.name,
    original_title: tvshow.original_name,
  }
}

// Map the tvshows Dto to ressemble the movies Dto
export function mapToMoviesDto(tvshowDto: TvshowsDto): MoviesDto {
  return {
    page: tvshowDto.page,
    results: tvshowDto.results.map(mapToMovie),
    total_pages: tvshowDto.total_pages,
    total_results: tvshowDto.total_results,
  }
}
