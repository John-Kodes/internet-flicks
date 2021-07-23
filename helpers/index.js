import { TMDB_API, API_KEY } from "@/config/index";
import DefaultBackdropMain from "@/images/DefaultBackdropMain.svg";
import cookie from "cookie";

// we will be using cookies to store the session ID
export const parseCookies = (req) => {
  // if a req is passed in then we pass in the cookie that is to be parsed. If that cookie doesnt exist, we will pass in an empty string. Also if a req isnt passed in
  return cookie.parse(req ? req.headers.cookie || "" : "");
};

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
