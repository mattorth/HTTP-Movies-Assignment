import React, { useState } from "react";

const UpdateMovieForm = (props) => {

    const [movie, setMovie] = useState({
        id: props.match.params.id,
        title: "",
        director: "",
        metascore: "",
        stars: []
});

    const handleChange = e => {
        if(e.target.name === "stars") {
            setMovie({...movie, [e.target.name]: e.target.value.split(",")})
        } else {
        setMovie({...movie, [e.target.name]: e.target.value})
        }
    }

    const putMessage = e => {
        e.preventDefault();
        props.updateMovie(movie);
        setMovie({});

    }
    return (
        <form onSubmit={putMessage} >
            <input type="text" name="title" onChange={handleChange} placeholder="Title" value={movie.title} required/>
            <input type="text" name="director" onChange={handleChange} placeholder="Director" value={movie.director} required />
            <input type="text" name="metascore" onChange={handleChange} placeholder="Metascore" value={movie.metascore} required />
            <input type="text" name="stars" onChange={handleChange} placeholder="Stars" value={movie.stars} required />
            <button>Update</button>
        </form>
    )
}

export default UpdateMovieForm;