/* eslint-disable import/no-anonymous-default-export */
import cookie from "cookie";
import { TMDB_API, API_KEY } from "@/config/index";

// Where we actually login our user and fetch the session ID
export default async (req, res) => {
  if (req.method === "POST") {
    // destructuring the username and body from the request received
    const { username, password, token } = req.body;

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
          request_token: token,
        }),
      }
    );

    const data = await tmdbRes.json();

    // if login accepted, req validated
    if (data.success) {
      const sessionRes = await fetch(
        `${TMDB_API}/authentication/session/new${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            request_token: data.request_token,
          }),
        }
      );

      const sessionData = await sessionRes.json();

      if (sessionData.success) {
        // Getting account details
        const accountRes = await fetch(
          `${TMDB_API}/account${API_KEY}&session_id=${sessionData.session_id}`
        );
        const accountData = await accountRes.json();

        // settting session id and account ID in cookies
        res.setHeader("Set-Cookie", [
          cookie.serialize("sessionId", sessionData.session_id, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "strict",
            path: "/",
          }),
          cookie.serialize("accountId", accountData.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "strict",
            path: "/",
          }),
        ]);

        res.status(200).json({ ...accountData, success: true });
      } else {
        res
          .status(sessionData.status_code)
          .json({ message: sessionData.status_message, success: false });
      }
    } else {
      console.log(data);
      res.status(404).json({ message: data.status_message, success: false });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(404).json({ message: `Method ${req.method} not allowed` });
  }
};
