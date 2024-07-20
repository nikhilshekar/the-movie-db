import Carousel from "../components/Carousel";
import Loading from "../components/Loading";

const Home = ({
  topRatedMovies,
  popularMovies,
  trendingMovies,
  upcomingMovies,
  watchListIds,
  loading,
  setWatchListIds,
}) => {
  return (
    <section className="container">
      {loading ? (
        <Loading />
      ) : (
        <div className="container d-flex flex-column py-3 text-center">
          <div className="pupular-section mt-2">
            <div className="fs-4 mb-2 fw-bold  text-center">Popular Movies</div>
            <Carousel
              movies={popularMovies}
              watchListIds={watchListIds}
              setWatchListIds={setWatchListIds}
            />
          </div>
          <div className="topRated-section mt-2">
            <div className="fs-4 mb-2 fw-bold ps-3">Top Rated Movies</div>
            <Carousel
              movies={topRatedMovies}
              watchListIds={watchListIds}
              setWatchListIds={setWatchListIds}
            />
          </div>
          <div className="trending-section mt-2">
            <div className="fs-4 mb-2 fw-bold ps-3">Trending Movies</div>
            <Carousel
              movies={trendingMovies}
              watchListIds={watchListIds}
              setWatchListIds={setWatchListIds}
            />
          </div>
          <div className="upcoming-section mt-2">
            <div className="fs-4 mb-2 fw-bold ps-3">Upcoming Movies</div>
            <Carousel
              movies={upcomingMovies}
              watchListIds={watchListIds}
              setWatchListIds={setWatchListIds}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Home;
