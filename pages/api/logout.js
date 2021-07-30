import cookie from "cookie";
import { TMDB_API, API_KEY } from "@/config/index";

export default async (req, res) => {
  if (req.method === "DELETE") {
    const { sessionId } = cookie.parse(req.headers.cookie);

    const tmdbRes = await fetch(
      `${TMDB_API}/authentication/session${API_KEY}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: sessionId,
        }),
      }
    );

    const deleteData = await tmdbRes.json();

    if (deleteData.success) {
      // Destroying cookie
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("sessionId", "", {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          expires: new Date(0),
          sameSite: "strict",
          path: "/",
        })
      );

      res
        .status(200)
        .json({ message: "session_id successfully deleted", success: true });
    } else {
      res.status(404).json({ message: "session_id invalid", success: false });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(404).json({ message: `Method ${req.method} not allowed` });
  }
};
