import cookie from "cookie";
import { TMDB_API, API_KEY } from "@/config/index";

export default async (req, res) => {
  if (req.method === "POST") {
    const { id, mediaType } = req.body;

    const { sessionId, isGuest } = cookie.parse(req.headers.cookie);

    const tmdbRes = await fetch(
      `${TMDB_API}/${mediaType}/${id}/account_states${API_KEY}&session_id=${sessionId}`
    );
    const data = await tmdbRes.json();

    if (data.id) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: data.status_message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(404).json({ message: `Method ${req.method} not allowed` });
  }
};
