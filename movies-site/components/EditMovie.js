import React from "react";
import axios from "axios";
class EditMovie extends React.Component {
  state = {
    name: "",
    rating: "",
    overview: "",
    imageURL: "",
  };
  //Filmi düzenle butonuna bastıgımız zaman var olan bilgileri de görmek istiyoruz. Bunun için en iyi yazılacak yer
  // "componentDidMount"dir. çünkü mount edilir edilmez bilgiler de gelsin
  async componentDidMount() {
    const id = this.props.match.params.id;
    //EditMovie componentine biz props olarak bir id göndermedik fakat App.js'de path={"/edit/:id"} olarak verdiğimiz için artık
    //butona tıklandığında URL'den biz bu id'yi çekebiliyoruz
    const response = await axios.get(`http://localhost:3002/movies/${id}`);
    const movie = response.data;
    this.setState({
      name: movie.name,
      rating: movie.rating,
      overview: movie.overview,
      imageURL: movie.imageURL,
    });
  }

  //İnputlara value değerini verdik fakat bu değeleri değiştiremiyorduk, bu değeleri değiştirebilmek için [e.target.name]: e.target.value
  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    //Kullanıcının değiştirdiği bilgileri alıyoruz
    const { name, rating, overview, imageURL } = this.state;
    const id = this.props.match.params.id;

    const updatedMovie = {
      /*
        name,
        rating,
        overview,
        imageURL 
    direkt bu şekilde de yazabiliriz eğer value ve key birbirinin aynısı ise*/
      name: name,
      rating: rating,
      overview: overview,
      imageURL: imageURL,
    };
    this.props.onUpdatedMovie(id, updatedMovie);
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="container">
        {/* film eklediğimiz zaman sayfa yenilenmesin istiyoruz */}
        <form className="mt-5" onSubmit={this.handleFormSubmit}>
          <input
            className="form-control"
            id="disabledInput"
            type="text"
            placeholder="Edit The Form To Update A Movie.."
            disabled
          />
          <div className="form-row">
            <div className="form-group col-md-10">
              <label htmlFor="inputName">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this.onInputChange}
              />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputRating">Rating</label>
              <input
                type="text"
                className="form-control"
                name="rating"
                value={this.state.rating}
                onChange={this.onInputChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="inputImage">Image URL</label>
              <input
                type="text"
                className="form-control"
                name="imageURL"
                value={this.state.imageURL}
                onChange={this.onInputChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="overviewTextarea">Overview</label>
              <textarea
                className="form-control"
                name="overview"
                rows="5"
                value={this.state.overview}
                onChange={this.onInputChange}
              ></textarea>
            </div>
          </div>
          <button type="submit" className="btn btn-danger btn-block">
            Update the Movie
          </button>
        </form>
      </div>
    );
  }
}

export default EditMovie;
