import { TMDB_API, API_KEY } from "@/config/index";

export const fetchMovie = async (id) => {
  const res = await fetch(`${TMDB_API}/movie/${id}${API_KEY}`);
  const movie = await res.json();

  return movie;
};
