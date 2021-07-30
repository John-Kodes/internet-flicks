import cookie from "cookie";
import { TMDB_API, API_KEY } from "@/config/index";

export default async (req, res) => {
  if (req.method === "POST") {
    const { id, mediaType, value } = req.body;
    const { sessionId } = cookie.parse(req.headers.cookie);

    const tmdbRes = await fetch(
      `${TMDB_API}/${mediaType}/${id}/rating${API_KEY}&session_id=${sessionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value,
        }),
      }
    );
    const data = await tmdbRes.json();
    console.log(data);

    if (data.success) {
      res.status(200).json({ message: data.status_message, success: true });
    } else {
      res.status(404).json({ message: data.status_message, success: false });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(404).json({ message: `Method ${req.method} not allowed` });
  }
};
