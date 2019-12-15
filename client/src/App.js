import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovieForm from "./Movies/UpdateMovieForm";
import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const updateMovie = movie => {
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route path="/update-movie/:id" render={props => (
        <>
        <Movie {...props} addToSavedList={addToSavedList} />
        <UpdateMovieForm updateMovie={updateMovie} {...props} />
        </>
      )} />
    </>
  );
};

export default App;
