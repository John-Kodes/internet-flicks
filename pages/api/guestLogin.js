import cookie from "cookie";
import { TMDB_API, API_KEY } from "@/config/index";

// Where we actually login our user and fetch the session ID
export default async (req, res) => {
  if (req.method === "GET") {
    const tmdbRes = await fetch(
      `${TMDB_API}/authentication/guest_session/new${API_KEY}`
    );
    const sessionObj = await tmdbRes.json();

    if (sessionObj.success) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("sessionId", sessionObj.guest_session_id, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7,
          sameSite: "strict",
          path: "/",
        })
      );

      res.status(200).json({ message: "session id created!" });
    } else {
      res.status(404).json({ message: sessionObj.status_message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(404).json({ message: `Method ${req.method} not allowed` });
  }
};
