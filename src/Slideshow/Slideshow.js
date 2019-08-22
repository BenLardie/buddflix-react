import React, { useEffect, useState } from 'react';
import { Slide } from 'react-slideshow-image';
import strain from '../Images/strain.jpg';
import welcome from '../Images/welcomeBanner.png';
import Avengers from '../Images/Avengers.png'
import logo from '../Images/logo.png'
import './Slideshow.scss';
import axios from 'axios';

const slideImages = [
    welcome,
    strain,
    Avengers
];

const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
    imagesWidth: 100,
}

const api_key = process.env.REACT_APP_TMDB_API_KEY
const url = `https://api.themoviedb.org/3/keyword/54169/movies?api_key=${api_key}&language=en-US&include_adult=false`

const imgBaseUrl = 'https://image.tmdb.org/t/p/w1400_and_h450_face/'

const Slideshow = () => {
    const [images, setImages] = useState(slideImages);


    


    const slides = images.map((img, index) => (
        <div className="each-slide" key={index}>
            <div style={{'backgroundImage': `url(${img.url})`}} />
            <h2 className='slideshow-title'>{img.title}</h2>
        </div>
    ));


    return (
        <>
            <div className="backdrop-slides">
                <Slide {...properties}>
                    {slides}
                </Slide>
            </div>
            <div className="poster-slides">
                <img src={logo} alt="buddflix-logo" />
            </div>
        </>
    )
}

export default Slideshow;