import React, {useEffect} from 'react';
import axios from 'axios';


const Recommendations = (movieId) => {
    const api_key = process.env.REACT_APP_TMDB_API_KEY


    useEffect(()=> {
        axios.get(`https://api.themoviedb.org/3/movie/${movieId.movieId}/recommendations?api_key=${api_key}&language=en-US&page=1`).
        then(response => {
            const data = response
            console.log(data)

        })

    },movieId)

    return (
        <h1>hello</h1>
    )

}

export default Recommendations;