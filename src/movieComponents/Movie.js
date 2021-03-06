import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Movie.scss';
import Trailer from './Trailer'
import Recommendations from './Recommendations';

const Movie = ({ selectedGenre }) => {
    const [movie, setMovie] = useState()
    const movieRef = useRef(null)
    const api_key = process.env.REACT_APP_TMDB_API_KEY
    const imgBaseUrl = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/'
    const backdropBaseUrl = 'https://image.tmdb.org/t/p/w1400_and_h450_face/'

    useEffect(() => {


        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_genres=${selectedGenre}`
        const fetchData = async () => {
            const result = await axios.get(url)
            const randomMovie = selectRandom(result.data.results);
            setMovie(randomMovie);

        }
        fetchData();
    }, [selectedGenre])

    useEffect(() => {
        window.scrollTo(0, movieRef.current.offsetTop)
    }, [movie])


    function selectRandom(array) {
        let num = Math.floor((Math.random() * array.length));
        return (array[num]);
    }


    const renderMovie = movie && (
        <>
            <div className='movie-box'>
                <h1 className='movie-title'>{movie.title}</h1>
                <div className="movie-poster">
                    <img src={`${imgBaseUrl}${movie.poster_path}`} alt={movie.title} />
                </div>
                <div className="back-drop">
                    <img src={`${backdropBaseUrl}${movie.backdrop_path}`} alt={movie.title} />
                    <div className='movie-details'>
                        <p>{movie.overview}</p>
                    </div>
                </div>
            </div>
            <Trailer movieId={movie.id} />
            <Recommendations movieId={movie.id} />
        </>
    )

    return (
        <>
            <div ref={movieRef}></div>
            <div>
                {renderMovie}
            </div>

        </>
    )

}

export default Movie;