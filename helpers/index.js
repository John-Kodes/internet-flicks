import { TMDB_API, API_KEY } from "@/config/index";
import DefaultBackdropMain from "@/images/DefaultBackdropMain.svg";

export const fetchMovie = async (id) => {
  const res = await fetch(`${TMDB_API}/movie/${id}${API_KEY}`);
  const movie = await res.json();

  return movie;
};

export const defaultMovie = {
  original_title: "default",
  backdrop_path: DefaultBackdropMain.src,
  overview: "default overview",
};
