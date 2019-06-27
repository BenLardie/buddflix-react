import React, { useEffect, useState, useRef } from 'react';
import { Spring } from 'react-spring/renderprops'
import StrainList from './StrainList';
import axios from 'axios';
import './Categories.scss';
import Search from '../Search/Search'
import SearchResults from '../Search/SearchReults';

const url = 'https://buddflix.herokuapp.com/api/race/'

const Categories = () => {
    const [races, setRaces] = useState([]);
    const [selectedRace, setSelectedRace] = useState({});
    const [searchedStrain, SetSearchedStrain] =useState([])
    const [searchError, setError] = useState(false);
    const raceRef = useRef(null);

    useEffect(() => {
        axios.get(url).then(response => {
            const results = response.data.objects;
            setRaces(results);
        });
    }, []);

    useEffect(() => {
        window.scrollTo(0, raceRef.current.offsetTop)
    }, [races]);

    const search = searchValue => {
        axios.get(`https://buddflix.herokuapp.com/api/strain?name__icontains=${searchValue}`)
        .then(response => {
            if (response.data.objects.length > 0){
            SetSearchedStrain(response.data.objects)
            setError(false)
            console.log(searchValue)
        }else {
            setError(true);
            console.log(searchError)
        }})
        .catch(function (error) {
            console.log(error);
        })
    };

    return (
        <>
        <Spring
        from={{opacity: 0}}
        to={{opacity: 1}}
        >
        {props => (
            <div style={props} >
                <div className="races" ref={raceRef} >
                {races.map(race => (
                    <button className='btn' onClick={() => setSelectedRace(race)} key={race.id}>
                        <span>{race.name}</span>
                    </button>
                ))}
                </div>
                <StrainList selectedRace={selectedRace} />
            </div>
        )}
        </Spring>
        <Search search={search} />
        <SearchResults searchedStrain={searchedStrain} searchError={searchError} />

        </>
    )
}

export default Categories;
