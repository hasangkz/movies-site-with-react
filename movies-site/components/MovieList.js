import React from "react";
import { Link } from "react-router-dom";

const MovieList = function (props) {
  //Filmin açıklama uzunluğunu ayarladık
  const truncate = (string, maxlength) => {
    if (!string) return null;
    if (string.length <= maxlength) return string;
    return `${string.substring(0, maxlength)} ...`;
  };
  return (
    <div className="row">
      {props.movies.map((movie, i) => (
        <div className="col-lg-4" key={i}>
          {/*key={movie.id}> bunu yaptık ama yeni bir film ekleyince id'de sorun oluyor 
          onun yerine i'yi key olarak atadık ve bu i dizideki sayıyı gösterecek*/}
          <div className="card mb-4 shadow-sm">
            <img src={movie.imageURL} className="card-img-top" alt="Sample" />
            <div className="card-body">
              <h5 className="card-title">{movie.name}</h5>
              <p>{truncate(movie.overview, 140)}</p>
              <div className="d-flex justify-content-between align-items-center">
                <button
                  type="button"
                  className="btn btn-md btn-outline-danger"
                  onClick={event => props.deleteMovie(movie)} //event => xxx bu şekil yerine direkt xxx() fonksiyonunu çağıramıyoruz
                  // event'i arrow function şekilde yazmak zorundayız ki render edilebilsin fonksiyon
                  //handleClick() ---> böyle yazarsak butona tıklamasak bile compenent mount olur olmaz çalışır
                  // handleClick ---> bu şekil ise sadece tıkladıgmız zaman fonksiyonu çalıştırır
                >
                  Delete
                </button>
                <Link
                  type="button"
                  className="btn btn-md btn-outline-primary"
                  to={`edit/${movie.id}`}
                >
                  Edit
                </Link>
                <h2>
                  <span className="badge badge-info">{movie.rating}</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;

/*

statik tasarım bu şekilde:
class MovieList extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-lg-4">
          <div className="card mb-4 shadow-sm">
            <img
              src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/dXNAPwY7VrqMAo51EKhhCJfaGb5.jpg"
              className="card-img-top"
              alt="Sample"
            />
            <div className="card-body">
              <h5 className="card-title">Sample Movie</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
              <div className="d-flex justify-content-between align-items-center">
                <button type="button" className="btn btn-md btn-outline-danger">
                  Delete
                </button>
                <h2>
                  <span className="badge badge-info">8.2</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

*/
