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

const CategoryPage = ({ movies, mediaType }) => {
  const [pageNum, setPageNum] = useState(3);
  const [movieArr, setMovieArr] = useState(movies);

  const router = useRouter();

  const getMoreMovies = async () => {
    const res = await fetch(
      `${TMDB_API}/${mediaType}/popular${API_KEY}&language=en-US&page=${pageNum}`
    );
    const newMovies = await res.json();

    setMovieArr([...movieArr, ...newMovies.results]);
    setPageNum(pageNum + 1);
  };

  useEffect(() => {
    if (router.query.id)
      return router.push(`/browse/title/${router.query.id}?media=${mediaType}`);
  }, []);

  return (
    <Layout>
      <main className={styles.containerMain}>
        <MovieModal />
        <InfiniteScroll
          dataLength={movieArr.length}
          next={getMoreMovies}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          className={styles.container}
          // for some reason, it's automatically auto
          style={{ overflow: "hidden" }}
        >
          {movieArr.map((movie) => (
            <MovieListItem
              movie={movie}
              key={movie.id}
              mediaType={router.query.category.split("-")[0]}
            />
          ))}
        </InfiniteScroll>
      </main>
    </Layout>
  );
};

export default CategoryPage;

export const getServerSideProps = async ({ query: { category } }) => {
  const whatCategory = () => {
    switch (category) {
      case "movies":
        return "movie";
      case "tv-shows":
        return "tv";
      default:
        return "movie";
    }
  };

  const res = await fetch(`${TMDB_API}/${whatCategory()}/popular${API_KEY}`);
  const movies = await res.json();

  const res2 = await fetch(
    `${TMDB_API}/${whatCategory()}/popular${API_KEY}&language=en-US&page=2`
  );
  const movies2 = await res2.json();

  return {
    props: {
      movies: [...movies.results, ...movies2.results],
      mediaType: whatCategory(),
    },
  };
};
