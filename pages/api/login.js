import cookie from "cookie";
import { TMDB_API, API_KEY } from "@/config/index";

// Where we actually login our user and fetch the session ID
export default async (req, res) => {
  if (req.method === "POST") {
    // destructuring the username and body from the request received
    const { username, password, tempToken } = req.body;

    const tmdbRes = await fetch(
      `${TMDB_API}/authentication/token/validate_with_login${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          request_token: tempToken,
        }),
      }
    );

    const data = await tmdbRes;

    // setting the cookie
    if (data.success) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("sessionId", data.session_id, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7,
          sameSite: "strict",
          path: "/",
        })
      );
    } else {
      res.status(data.status_code).json({ message: data.status_message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
