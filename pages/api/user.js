/* eslint-disable import/no-anonymous-default-export */
import cookie from "cookie";
import { TMDB_API, API_KEY } from "@/config/index";
import { parseCookies } from "@/helpers/index";

export default async (req, res) => {
  if (req.method === "GET") {
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }

    const { sessionId } = parseCookies(req);

    // Getting account details
    const accountRes = await fetch(
      `${TMDB_API}/account${API_KEY}&session_id=${sessionId}`
    );
    const accountData = await accountRes.json();

    if (accountData.id) {
      res.status(200).json(accountData);
    } else {
      res.status(404).json({ message: "User forbidden" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(404).json({ message: `Method ${req.method} not allowed` });
  }
};
