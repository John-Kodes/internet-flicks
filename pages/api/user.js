import cookie from "cookie";
import { TMDB_API, API_KEY } from "@/config/index";

export default async (req, res) => {
  if (req.method == "GET") {
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }
    const { token } = cookie.parse(req.headers.cookie);

    const tmdbRes = await fetch(`${API_URL}`);
  }
};
