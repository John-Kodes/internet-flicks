import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
// Context
import Context from "@/context/Context";
// Components
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import MovieList from "@/components/MovieList";
import MovieModal from "@/components/MovieModal";
// styles
import styles from "@/styles/Browse.module.scss";
// API
import { TMDB_API, API_KEY } from "@/config/index";

export const BrowsePage = ({
  featuredMovie,
  popularMovies,
  upcomingMovies,
  topRatedMovies,
  nowPlayingMovies,
  genres,
}) => {
  const router = useRouter();
  const { setModalData, setModalOpen } = useContext(Context);

  useEffect(() => {
    if (router.query.id)
      router.push(`/browse/title/${router.query.id}?media=movie`);
  }, []);

  useEffect(() => {
    if (!router.query.id) {
      setModalOpen();
      setModalData();
    }
  }, [router.query.id]);

  return (
    <Layout>
      <MovieModal />
      <Header movie={featuredMovie} />
      <main className={styles.main}>
        <MovieList category="What's Popular" movies={popularMovies} />
        <MovieList category="Top Rated" movies={topRatedMovies} />
        <MovieList category="Upcoming" movies={upcomingMovies} />
        <MovieList category="Now Playing" movies={nowPlayingMovies} />
      </main>
    </Layout>
  );
};

export default BrowsePage;

export const getServerSideProps = async ({ req }) => {
  console.log("browse: " + req.headers.cookie);

  const popularRes = await fetch(`${TMDB_API}/movie/popular${API_KEY}`);
  const popularMovies = await popularRes.json();

  const upcomingRes = await fetch(`${TMDB_API}/movie/upcoming${API_KEY}`);
  const upcomingMovies = await upcomingRes.json();

  const topRatedRes = await fetch(`${TMDB_API}/movie/top_rated${API_KEY}`);
  const topRatedMovies = await topRatedRes.json();

  const nowPlayingRes = await fetch(`${TMDB_API}/movie/now_playing${API_KEY}`);
  const nowPlayingMovies = await nowPlayingRes.json();

  const rng = Math.floor(Math.random() * upcomingMovies.results.length + 1);

  const featuredRes = await fetch(
    `${TMDB_API}/movie/${upcomingMovies.results[rng].id}${API_KEY}`
  );
  const featuredMovie = await featuredRes.json();

  const genresRes = await fetch(
    `${TMDB_API}/genre/movie/list${API_KEY}&language=en-US`
  );
  const genres = await genresRes.json();

  return {
    props: {
      popularMovies: popularMovies.results,
      upcomingMovies: upcomingMovies.results,
      topRatedMovies: topRatedMovies.results,
      nowPlayingMovies: nowPlayingMovies.results,
      featuredMovie,
      genres: genres.genres,
    },
  };
};
