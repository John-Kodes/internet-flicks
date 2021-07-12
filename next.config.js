module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "occ-0-1190-2774.1.nflxso.net",
      "media.discordapp.net",
      "image.tmdb.org",
    ],
  },
  env: {
    TMDB_API_KEY: process.env.TMDB_API_KEY,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
