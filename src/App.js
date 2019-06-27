import React, {useEffect, useState} from 'react';
import AgeVerification from './AgeVerification/AgeVerification';
import Navigation from './Navigation/Navigation';



const App = () =>  {

  const [age, setAge] = useState(null);

  useEffect(()=> {
    console.log(window.localStorage)
    setAge(window.localStorage['ageVerified'])
  })

  console.log(age)

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
