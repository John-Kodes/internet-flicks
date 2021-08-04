import { useContext, useEffect, useState } from "react";
// Context
import Context from "@/context/Context";
// Components
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import MovieModal from "@/components/MovieModal";
import MovieListItem from "@/components/MovieListItem";
// Helpers
import { parseCookies } from "@/helpers/index";
// NPM
import InfiniteScroll from "react-infinite-scroll-component";
// styles
import styles from "@/styles/MyListPage.module.scss";
import { API_KEY, TMDB_API } from "@/config/index";

const MyListPage = ({ watchlist, totalResults }) => {
  const { userData } = useContext(Context);

  const [pageNum, setPageNum] = useState(3);
  const [watchlistArr, setWatchlistArr] = useState(watchlist);
  const [hasMore, setHasMore] = useState(true);

  const getMoreMedia = async () => {
    const moviesRes = await fetch(
      `${TMDB_API}/account/${userData.id}/watchlist/movies${API_KEY}&language=en-US&session_id=sessionId&sort_by=created_at.asc&page=${pageNum}`
    );
    const newMovies = await moviesRes.json();

    const tvRes = await fetch(
      `${TMDB_API}/account/${userData.id}/watchlist/tv${API_KEY}&language=en-US&session_id=sessionId&sort_by=created_at.asc&page=${pageNum}`
    );
    const newTv = await tvRes.json();

    setWatchlistArr([...watchlistArr, ...newMovies.results, ...newTv.results]);
    setPageNum(pageNum + 1);
  };

  useEffect(() => {
    if (watchlistArr.length >= totalResults) setHasMore(false);
  }, [watchlistArr]);

  return (
    <Layout
      category={
        userData ? (userData.name || userData.username) + "'s watchlist" : ""
      }
    >
      <MovieModal />
      <InfiniteScroll
        dataLength={watchlistArr.length}
        next={getMoreMedia}
        hasMore={hasMore}
        loader={<Loader />}
        className={styles.container}
        // for some reason, it's automatically auto
        style={{ overflow: "hidden" }}
      >
        {watchlistArr.length > 0 ? (
          watchlistArr.map((movie, i) => (
            <MovieListItem movie={movie} key={i} />
          ))
        ) : (
          <div className={styles.emptyListContainer}>
            <div className={styles.message}>
              You don't have any movies or TV shows saved in your watchlist!{" "}
              <br />
              <br />
              <span>¯\_(ツ)_/¯</span>
            </div>
          </div>
        )}
      </InfiniteScroll>
    </Layout>
  );
};

export const getServerSideProps = async ({ req }) => {
  const { sessionId, accountId } = parseCookies(req);

  const movies1Res = await fetch(
    `${TMDB_API}/account/${accountId}/watchlist/movies${API_KEY}&language=en-US&session_id=${sessionId}&sort_by=created_at.asc&page=1`
  );

  const movies2Res = await fetch(
    `${TMDB_API}/account/${accountId}/watchlist/movies${API_KEY}&language=en-US&session_id=${sessionId}&sort_by=created_at.asc&page=2`
  );

  const tv1Res = await fetch(
    `${TMDB_API}/account/${accountId}/watchlist/tv${API_KEY}&language=en-US&session_id=${sessionId}&sort_by=created_at.asc&page=1`
  );

  const tv2Res = await fetch(
    `${TMDB_API}/account/${accountId}/watchlist/tv${API_KEY}&language=en-US&session_id=${sessionId}&sort_by=created_at.asc&page=2`
  );

  const movies1 = await movies1Res.json();
  const movies2 = await movies2Res.json();
  const tv1 = await tv1Res.json();
  const tv2 = await tv2Res.json();

  const totalResults = movies1.total_results + tv1.total_results;

  return {
    props: {
      totalResults,
      watchlist: [
        ...movies1.results,
        ...movies2.results,
        ...tv1.results,
        ...tv2.results,
      ],
    },
  };
};

export default MyListPage;
