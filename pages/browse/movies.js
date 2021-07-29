import { useEffect, useState } from "react";
// Components
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import MovieListItem from "@/components/MovieListItem";
import MovieModal from "@/components/MovieModal";
// NPM
import InfiniteScroll from "react-infinite-scroll-component";
// API
import { TMDB_API, API_KEY } from "@/config/index";
// Styles
import styles from "@/styles/Category.module.scss";
import { useRouter } from "next/router";

const MoviesPage = ({ movies, mediaType }) => {
  const [pageNum, setPageNum] = useState(3);
  const [movieArr, setMovieArr] = useState(movies);

  const router = useRouter();

  const getMoreMovies = async () => {
    const res = await fetch(
      `${TMDB_API}/movie/popular${API_KEY}&language=en-US&page=${pageNum}`
    );
    const newMovies = await res.json();

    setMovieArr([...movieArr, ...newMovies.results]);
    setPageNum(pageNum + 1);
  };

  useEffect(() => {
    if (router.query.id)
      return router.push(
        `/browse/title/${router.query.id}?media=${router.query.media}`
      );
  }, []);

  return (
    <Layout category="movies" useFooter={false}>
      <main className={styles.containerMain}>
        <MovieModal />
        <InfiniteScroll
          dataLength={movieArr.length}
          next={getMoreMovies}
          hasMore={true}
          loader={<Loader />}
          className={styles.container}
          // for some reason, it's automatically auto
          style={{ overflow: "hidden" }}
        >
          {movieArr.map((movie, i) => (
            <MovieListItem movie={movie} key={i} />
          ))}
        </InfiniteScroll>
      </main>
    </Layout>
  );
};

export default MoviesPage;

export const getServerSideProps = async ({ query: { category } }) => {
  const res = await fetch(`${TMDB_API}/movie/popular${API_KEY}`);
  const movies = await res.json();

  const res2 = await fetch(
    `${TMDB_API}/movie/popular${API_KEY}&language=en-US&page=2`
  );
  const movies2 = await res2.json();

  return {
    props: {
      movies: [...movies.results, ...movies2.results],
    },
  };
};
