import React, { useEffect, useState, useRef } from 'react';
import Strain from '../StrainComponets/Strain';
import Movie from '../movieComponents/Movie';
import axios from 'axios';
// import './Categories.scss';

const SearchResults = ({ searchedStrain }) => {
    const [strains, setStrains] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState();
    const strainsRef = useRef(null);

    // useEffect(() => {
    //     if (selectedRace.id) {
    //         const url = `https://buddflix.herokuapp.com/api/strain/?race=${selectedRace.id}`
    //         axios.get(url).then(response => {
    //             const results = response.data.objects;
    //             setStrains(results);
    //         });
    //     }
    // }, [selectedRace])

    useEffect(() => {    searchedStrain.forEach(function(strain) {
        const tempGenre=[]
        let strainRace = strain.race.id
        axios.get(`https://buddflix.herokuapp.com/api/genre?race=${strainRace}`)
        .then(response => {
            let respObj = response.data.objects;
            respObj.forEach((item) => {
                tempGenre.push(item.tmdb_id)
                setGenres(tempGenre)
        })
    })

    })}
, [searchedStrain]);

    useEffect(() => {
        window.scrollTo(0, strainsRef.current.offsetTop);
    }, [strains])

    const searchDisplay = searchedStrain.map((weed, index) => (
        <Strain genres={genres} weed={weed} key={index} setSelectedGenre={setSelectedGenre} />
    ));


    return (
        <>
            <h2 className='strain-race'  ref={strainsRef}>{searchedStrain.name}</h2>
                <div className="strains">
                    {searchDisplay}
                </div>
            {selectedGenre && <Movie selectedGenre={selectedGenre} />}
        </>
    )
}

export default SearchResults;