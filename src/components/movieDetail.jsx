import React from "react";

const MovieDetail = ({ match, history }) => {
  return (
    <div>
      <h1>Movie ID: {match.params.id}</h1>
      <button
        className="btn btn-secondary"
        onClick={() => history.push("/movies")}
      >
        Back to Movies
      </button>
    </div>
  );
};

export default MovieDetail;
