import React from 'react';
import '../scss/Movie.scss';

function Movie({ data }) {
  return (
    <>
      {data.map((item) => {
        const { id, title, medium_cover_image, summary, year, genres } = item;
        return (
          <div className="movie" key={id}>
            <img className="movie-img" src={medium_cover_image} alt="" />
            <div>
              <h2 className="movie-title">
                <span>{title}</span>
              </h2>
              <h3 className="movie-year">{year}</h3>
              {summary !== '' ? <p>{summary}</p> : <p>no summary...</p>}
              <ul className="movie-genres">
                {genres.map((genres, idx) => (
                  <li key={idx}>{genres}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Movie;
