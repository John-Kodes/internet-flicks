import { useContext, useEffect, useState } from "react";
// Components
import Layout from "@/components/Layout";
import MovieListItem from "@/components/MovieListItem";
import MovieModal from "@/components/MovieModal";
import Loader from "@/components/Loader";
import EndMessage from "@/components/EndMessage";
// NPM
import InfiniteScroll from "react-infinite-scroll-component";
// API
import { TMDB_API, API_KEY } from "@/config/index";
// Styles
import styles from "@/styles/Category.module.scss";
import { useRouter } from "next/router";
// Icons
import { FaExclamationTriangle } from "react-icons/fa";
import Context from "@/context/Context";
import { fetchMediaDetails } from "@/helpers/index";

const SearchPage = ({ movies, searchQuery, totalResults }) => {
  const { setModalOpen, setModalData } = useContext(Context);

  const [pageNum, setPageNum] = useState(3);
  const [movieArr, setMovieArr] = useState(movies);
  // Checks if there are more results
  const [hasMore, setHasMore] = useState(true);

  const router = useRouter();

  const getMoreMovies = async () => {
    const res = await fetch(
      `${TMDB_API}/search/multi${API_KEY}&language=en-US&query=${searchQuery}&page=${pageNum}&include_adult=false`
    );
    const newMovies = await res.json();

    console.log(newMovies);

    setMovieArr([...movieArr, ...newMovies.results]);
    setPageNum(pageNum + 1);
  };

  useEffect(() => {
    if (router.query.id)
      return router.push(
        `/browse/title/${router.query.id}?media=${router.query.media}`
      );
  }, []);

  useEffect(() => {
    setHasMore(totalResults > movieArr.length ? true : false);
  }, [movieArr]);

  return (
    <Layout category={`Results for "${searchQuery}"`}>
      <main className={styles.containerMain}>
        {totalResults ? (
          <>
            <MovieModal />
            <InfiniteScroll
              dataLength={movieArr.length}
              next={getMoreMovies}
              hasMore={hasMore}
              loader={<Loader />}
              endMessage={<EndMessage totalResults={totalResults} />}
              className={styles.container}
              // for some reason, it's automatically auto
              style={{ overflow: "hidden" }}
            >
              {movieArr.map((movie, i) => (
                <MovieListItem movie={movie} key={i} />
              ))}
            </InfiniteScroll>
          </>
        ) : (
          <div className={styles.noResults}>
            <FaExclamationTriangle />
            Oh no, no results found
            <p>Try searching with different keywords</p>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default SearchPage;

export const getServerSideProps = async ({ query: { q } }) => {
  console.log(q);
  const res = await fetch(
    `${TMDB_API}/search/multi${API_KEY}&language=en-US&query=${q}&page=1&include_adult=false`
  );
  const movies = await res.json();

  const res2 = await fetch(
    `${TMDB_API}/search/multi${API_KEY}&language=en-US&query=${q}&page=2&include_adult=false`
  );
  const movies2 = await res2.json();

  console.log(movies);

  return {
    props: {
      movies: [...movies.results, ...movies2.results],
      searchQuery: q,
      totalResults: movies.total_results,
    },
  };
};
