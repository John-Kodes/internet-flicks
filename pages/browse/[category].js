import { useEffect, useState } from "react";
// Components
import MovieListItem from "@/components/MovieListItem";
import MovieModal from "@/components/MovieModal";
// NPM
import InfiniteScroll from "react-infinite-scroll-component";
// API
import { TMDB_API, API_KEY } from "@/config/index";
// Styles
import styles from "@/styles/Category.module.scss";
import { useRouter } from "next/router";

const Category = ({ movies, FETCH_URL }) => {
  const [pageNum, setPageNum] = useState(3);
  const [movieArr, setMovieArr] = useState(movies);

  const router = useRouter();

  const getMoreTests = async () => {
    //https://api.themoviedb.org/3/movie/popular?api_key=4c02ca062c903e28bf9d33dfa893cb3c&language=en-US&page=3
    const res = await fetch(
      `${TMDB_API}/${FETCH_URL}${API_KEY}&language=en-US&page=${pageNum}`
    );
    const newMovies = await res.json();

    setMovieArr([...movieArr, ...newMovies.results]);
    setPageNum(pageNum + 1);
  };

  useEffect(() => {
    if (router.query.id) router.push(`/browse/title/${router.query.id}`);
  }, []);

  return (
    <main>
      <MovieModal />
      <InfiniteScroll
        dataLength={movieArr.length}
        next={getMoreTests}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        className={styles.container}
      >
        {movieArr.map((movie) => (
          <MovieListItem movie={movie} key={movie.id} />
        ))}
      </InfiniteScroll>
    </main>
  );
};

export default Category;

export const getServerSideProps = async ({ query: { category } }) => {
  const whatCategory = () => {
    switch (category) {
      case "movies":
        return "movie/popular";
      default:
        return "movie/popular";
    }
  };

  const res = await fetch(`${TMDB_API}/${whatCategory()}${API_KEY}`);
  const movies = await res.json();

  const res2 = await fetch(
    `${TMDB_API}/${whatCategory()}${API_KEY}&language=en-US&page=2`
  );
  const movies2 = await res2.json();

  return {
    props: {
      movies: [...movies.results, ...movies2.results],
      FETCH_URL: whatCategory(),
    },
  };
};
