import { TMDB_API, API_KEY } from "@/config/index";
import DefaultBackdropMain from "@/images/DefaultBackdropMain.svg";

export const fetchMediaDetails = async (id, media = "movie") => {
  const res = await fetch(`${TMDB_API}/${media}/${id}${API_KEY}`);
  const mediaData = await res.json();

  return mediaData;
};

export const defaultMovie = {
  original_title: "default",
  backdrop_path: DefaultBackdropMain.src,
  overview: "default overview",
};
