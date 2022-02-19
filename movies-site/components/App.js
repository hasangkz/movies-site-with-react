import React from "react";
import MovieList from "./MovieList";
import SearchBar from "./SearchBar";
import AddMovie from "./AddMovie";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import EditMovie from "./EditMovie";

class App extends React.Component {
  state = {
    movies: [],

    search: "",
  };
  //Herhangi bir api ile alışveriş yapacaksak bunu ComponentDidMount() fonksiyonu içerisinde yapmak en sağlıkısı
  componentDidMount() {
    this.getMovies();
  }
  async getMovies() {
    const response = await axios.get("http://localhost:3002/movies/");
    this.setState({ movies: response.data });
  }

  // deleteMovie = movie => {
  //   const newMovieList = this.state.movies.filter(
  //     m => m.id !== movie.id
  //     //fonksiyonun içine argüman olarak verilen movienin id'si hariç olan movieleri aldık
  //   );

  addMovie = async movie => {
    await axios.post(`http://localhost:3002/movies/`, movie);
    this.setState(state => ({
      movies: state.movies.concat([movie]),
    }));
    this.getMovies();
  };

  deleteMovie = movie => {
    fetch(`http://localhost:3002/movies/${movie.id}`, { method: "DELETE" });
    const newMovieList = this.state.movies.filter(
      m => m.id !== movie.id
      //fonksiyonun içine argüman olarak verilen movienin id'si hariç olan movieleri aldık
    );

    /* Bu kullanım state kısmımız boş olduğu zaman yapılması daha sağlıklı
    this.setState({
    movies: newMovieList }); */

    //Bu kullanım ise state kısmı boş değil, güncellemek istediğimiz zamanlar bunu kullanmak daha iyi
    this.setState(state => ({
      movies: newMovieList,
    }));
  };
  //SearchBar componentindeki onChange eventini burada işledik.
  searchMovie = e => {
    console.log(e.target.value);
    this.setState({ search: e.target.value.toLowerCase() });
  };

  editMovie = async (id, updatedMovie) => {
    await axios.put(`http://localhost:3002/movies/${id}`, updatedMovie);
    this.getMovies();
  };

  render() {
    let filteredMovies = this.state.movies
      .filter(
        movie => {
          return (
            movie.name
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1
          );
        }
        //indexof ifadesi bir sonuç bulamazsa -1 olarak döner ama biz burada sonuç -1'e eşit değil ise returnla dediğimiz için
        //sadece eşleşenler gözükecek
      )
      .sort((a, b) => {
        return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
      });
    //Yeni eklediğimiz filmin ID'si her zaman daha büyük oluyor ve bizde yeni eklediğimiz filmi en üstte göstermek istediğimiz için
    //bu .sort metodunu kullandık burada ilki : -1 ikincisi : 1

    return (
      //Bütün return ifademizi Router ile sarıyoruz
      <Router>
        <div className="container">
          {/* Route'lerin başladığı kısımlardan önce de Switch ile sarıyoruz */}
          <Switch>
            <Route
              // exact --> "/"'e sahip olan yani ana sayfamız hangisi olacaksa ona atarız.
              exact
              path={"/"}
              // Neden bunda render var ? Çünkü bu Route divler ve propslar içeriyor bu yüzden özel olarak
              // render edilmesi lazım ve bütün divleri render içerisindeki arrow functiona yazacağız
              render={() => (
                // <React.Fragment> kullanıyoruz çünkü render'in içindeki birden fazla div olduğu için karışmasın hiçbiri
                <React.Fragment>
                  <div className="row">
                    <div className="col-lg-12">
                      <SearchBar searchMovie={this.searchMovie} />
                    </div>
                  </div>
                  <MovieList
                    //search kısmı olmadan önce direkt movies yazdırıyorduk ama artık filteredMovies yazdırıyoruz.
                    //zaten en başta da "" olarak belirttiğimiz için ilk açılışta full olarak hepsi gözüküyor
                    //movies={this.state.movies}
                    movies={filteredMovies}
                    deleteMovie={this.deleteMovie}
                  />
                </React.Fragment>
              )}
            ></Route>
            {/* Bu Route hiçbir özel div içermediği için direk bu şekilde de yazabiliriz */}

            <Route
              path={"/add"}
              render={({ history }) => (
                <AddMovie
                  addNewMovie={movie => {
                    this.addMovie(movie);

                    history.push("/");
                  }}
                />
              )}
            ></Route>
            <Route
              path={"/edit/:id"}
              render={props => (
                <EditMovie
                  {...props}
                  onUpdatedMovie={(id, movie) => {
                    this.editMovie(id, movie);
                  }}
                />
              )}
            ></Route>
            {/* :id  --> Dinamik bir değer vermek için ":" kullanıyoruz */}
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
