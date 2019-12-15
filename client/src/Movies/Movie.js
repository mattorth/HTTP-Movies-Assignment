import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

// starting project
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {console.log(res.data);
      this.setState({ movie: res.data })})
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deleteMovie = id => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log(res);
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.state.movie);
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <div className="delete-button" onClick={()=> {this.deleteMovie(this.props.match.params.id)}}>
          Delete
        </div>
        <div>
          <Link to={`/update-movie/${this.props.match.params.id}`}>Update Movie</Link>
        </div>
      </div>
    );
  }
}
