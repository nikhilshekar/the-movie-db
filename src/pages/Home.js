import Card from "../components/Card";



const Home = ({ movieList }) => {
  return (
    <div>
      <div className="container d-flex justify-content-around align-content-around  flex-wrap py-3 ">
        {movieList.map((movie, i) => (
          <Card movie={movie} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Home;
