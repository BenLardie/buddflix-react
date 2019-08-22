import React, {useEffect, useState} from 'react';
import AgeVerification from './AgeVerification/AgeVerification';
import Navigation from './Navigation/Navigation';



const App = () =>  {

  const [age, setAge] = useState(null);

  useEffect(()=> {
    setAge(window.localStorage['ageVerified'])
  })


    return (

        <>
          <Navigation />
          {!age ?
          <AgeVerification /> : null
          }
        </>

    );
  }


export default App;
