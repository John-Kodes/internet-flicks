import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
// Components
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import MovieList from "@/components/MovieList";
import MovieModal from "@/components/MovieModal";
// Context
import Context from "@/context/Context";
// styles
import styles from "@/styles/MovieDetailsPage.module.scss";
// API
import { TMDB_API, API_KEY } from "@/config/index";

export const MovieDetailsPage = ({
  featuredMovie,
  popularMovies,
  topRatedMovies,
  modalMovie,
}) => {
  const {
    setModalOpen,
    setModalData,
    setModalHistory,
    modalHistory,
  } = useContext(Context);

  const router = useRouter();

  const leavePageHandler = (e, element) => {
    if (!e.target.classList.contains(element)) return;
    setModalOpen(false);
    setModalData({});
    router.push("/browse");
  };

  const leavePageHandlerBtn = () => {
    setModalOpen(false);
    setModalData({});
    router.push("/browse");
  };

  useEffect(() => {
    setModalOpen(true);
    setModalData(modalMovie);
    setModalHistory([modalMovie]);
  }, []);

  return (
    <Layout
      title={modalMovie.original_title || modalMovie.original_name}
      description={modalMovie.overview}
      useFooter={false}
    >
      <MovieModal
        leavePageHandler={leavePageHandler}
        leavePageHandlerBtn={leavePageHandlerBtn}
      />
      <Header movie={featuredMovie} />
      <main className={styles.main}>
        <MovieList category="What's Popular" movies={popularMovies} />
        <MovieList category="Top Rated" movies={topRatedMovies} />
      </main>
    </Layout>
  );
};

export default MovieDetailsPage;

export const getServerSideProps = async ({ query }) => {
  const popularRes = await fetch(`${TMDB_API}/movie/popular${API_KEY}`);
  const popularMovies = await popularRes.json();

  const upcomingRes = await fetch(`${TMDB_API}/movie/upcoming${API_KEY}`);
  const upcomingMovies = await upcomingRes.json();

  const topRatedRes = await fetch(`${TMDB_API}/movie/top_rated${API_KEY}`);
  const topRatedMovies = await topRatedRes.json();

  const rng = Math.floor(Math.random() * upcomingMovies.results.length + 1);

  const featuredRes = await fetch(
    `${TMDB_API}/movie/${upcomingMovies.results[rng].id}${API_KEY}`
  );
  const featuredMovie = await featuredRes.json();

  const modalMovieRes = await fetch(
    `${TMDB_API}/${query.media}/${query.id}${API_KEY}`
  );
  const modalMovie = await modalMovieRes.json();

  return {
    props: {
      popularMovies: popularMovies.results,
      topRatedMovies: topRatedMovies.results,
      featuredMovie,
      modalMovie,
    },
  };
};
