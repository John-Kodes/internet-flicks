import cookie from "cookie";
import { TMDB_API, API_KEY } from "@/config/index";

export default async (req, res) => {
  if (req.method === "POST") {
    const { id, mediaType, update } = req.body;
    const { sessionId } = cookie.parse(req.headers.cookie);

    const tmdbRes = await fetch(
      `${TMDB_API}/account/${id}/watchlist${API_KEY}&session_id=${sessionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          media_type: mediaType,
          media_id: id,
          watchlist: update,
        }),
      }
    );
    const data = await tmdbRes.json();
    console.log(data);

    if (data.success) {
      res.status(200).json({ message: data.status_message });
    } else {
      res.status(405).json({ message: data.status_message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
