import React from "react";
import { Link } from "react-router-dom";

class SearchBar extends React.Component {
  // state = {
  //   search: "",
  // };
  prevent(e) {
    e.preventDefault(); //normalde kullanıcı aratınca ya da entere basınca sayfa yenilenir ben bunu engellemek istiyorum ki
    // react ile search yapabileyim
  }
  render() {
    return (
      //onSubmit={this.prevent}  --> submit olunca prevent metoduna git
      <form className="form-row mb-5" onSubmit={this.prevent}>
        <div className="col-10">
          <input
            onChange={this.props.searchMovie}
            //state bir object olduğu için {}'i unutma!
            //(event.target.value) bu şekilde inputa yazılan değeri elde ettik
            type="text"
            className="form-control"
            placeholder="Search a movie"
          />
        </div>
        <div className="col-2">
          {/* Link, React'in a etiketi gibi düşün ama buradaki "to" özelliği sayesinde sayfamızdaki istediğimiz bir yere
          götürüyoru bizi */}
          <Link
            to="/add"
            type="button"
            className="btn btn-md btn-danger"
            style={{ float: "right" }}
          >
            Add Movie
          </Link>
        </div>
      </form>
    );
  }
}

export default SearchBar;
