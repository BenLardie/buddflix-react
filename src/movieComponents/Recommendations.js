import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Trailer from './Trailer';
import './Recommendations.scss'



const Recommendations = (movieId) => {
    const api_key = process.env.REACT_APP_TMDB_API_KEY
    const [recommendedMovies, setRecommendedMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState({})
    const imgBaseUrl = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/'


    useEffect(()=> {
        axios.get(`https://api.themoviedb.org/3/movie/${movieId.movieId}/recommendations?api_key=${api_key}&language=en-US&page=1`).
        then(response => {
            const data = response.data.results
            setRecommendedMovies(data)
        })
    },[movieId])


    const displayRecommendations =
        recommendedMovies.map(movie => (
            <div className={'card'} onClick={() => setSelectedMovie(movie.id) }>
                <h3 key={movie.id}>{movie.title}</h3>
                <img src={`${imgBaseUrl}${movie.poster_path}`} alt={movie.title} />
            </div>
        ))


    return (
        <>
            <h1 className='suggestions-title'>{recommendedMovies.length} Similar Movies</h1>
            <div className={'recommendations-flexbox'}>
                {displayRecommendations}
            </div>

                <Trailer movieId={selectedMovie} />

        </>
    )

}

export default Recommendations;