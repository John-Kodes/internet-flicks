import { useEffect, useState } from "react";
// Components
import Layout from "@/components/Layout";
import MovieListItem from "@/components/MovieListItem";
import MovieModal from "@/components/MovieModal";
// NPM
import InfiniteScroll from "react-infinite-scroll-component";
// API
import { TMDB_API, API_KEY } from "@/config/index";
// Styles
import styles from "@/styles/Category.module.scss";
import { useRouter } from "next/router";

const TVShowsPage = ({ shows, mediaType }) => {
  const [pageNum, setPageNum] = useState(3);
  const [showsArr, setShowsArr] = useState(shows);

  const router = useRouter();

  const getMoreShows = async () => {
    const res = await fetch(
      `${TMDB_API}/tv/popular${API_KEY}&language=en-US&page=${pageNum}`
    );
    const newShows = await res.json();

    setShowsArr([...showsArr, ...newShows.results]);
    setPageNum(pageNum + 1);
  };

  useEffect(() => {
    if (router.query.id)
      return router.push(`/browse/title/${router.query.id}?media=${mediaType}`);
  }, []);

  return (
    <Layout category="tv shows">
      <main className={styles.containerMain}>
        <MovieModal />
        <InfiniteScroll
          dataLength={showsArr.length}
          next={getMoreShows}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          className={styles.container}
          // for some reason, it's automatically auto
          style={{ overflow: "hidden" }}
        >
          {showsArr.map((movie, i) => (
            <MovieListItem movie={movie} key={i} mediaType={mediaType} />
          ))}
        </InfiniteScroll>
      </main>
    </Layout>
  );
};

export default TVShowsPage;

export const getServerSideProps = async () => {
  const res = await fetch(`${TMDB_API}/tv/popular${API_KEY}`);
  const shows = await res.json();

  const res2 = await fetch(
    `${TMDB_API}/tv/popular${API_KEY}&language=en-US&page=2`
  );
  const shows2 = await res2.json();

  return {
    props: {
      shows: [...shows.results, ...shows2.results],
      mediaType: "tv",
    },
  };
};
