import React, {useEffect, useState} from 'react';
import LocationSearch from './components/LocationSearch';

function App() {

  const [temperature, setTemperature] = useState('')
  const [city, setCity] = useState('')
  const [term, setTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true)
  const [description, setDescription] = useState('')

  useEffect(()=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${term}&appid=059df12200f978687ba00b49c714b50b`)
    .then(res => res.json())
    .then(data => 
      {
        setTemperature(parseInt(data.main.feels_like-273))
        setCity(data.name)
        console.log(data)
        setIsLoading(false)
        setDescription(data.weather[0].description)
      }
    )
    .catch(err => console.log(err));
  },[term]);

  return (
    
    <div>
      <h1 className = "text-center font-mono text-5xl font-bold mt-32">City Weather</h1>

      <LocationSearch searchText = {(text) => setTerm(text)}/>

      { isLoading ? <h1 className = "font-bold text-5xl text-center">First Enter the City Name</h1> :

      <div className="mx-auto px-4 py-8 pr-2 max-w-xl my-20">
        <div className="bg-white shadow-2xl rounded-lg mb-6 tracking-wide" >
            <div className="md:flex-shrink-0">
                <img src="https://ik.imagekit.io/q5edmtudmz/post1_fOFO9VDzENE.jpg" alt="mountains" className="w-full h-64 rounded-lg rounded-b-none" />
            </div>
            <div className="px-4 py-2 mt-2 flex">
              <div>
                <h2 className="font-bold text-2xl text-gray-800 tracking-normal mb-4 mr-53">Temperature</h2>
                <p className = "font-bold text-5xl">{temperature}* C</p>
              </div>
              <div>
                <div className = "flex align-middle">
                  <h4 className="font-bold text-xl text-gray-800 tracking-normal mr-2">City:</h4>
                  <p className="font-semibold py-0.5 mr-2">{city}</p>
                </div>
                <div className = "flex align-middle">
                  <h4 className="font-bold text-xl text-gray-800 tracking-normal mr-2">Weather:</h4>
                  <p className="font-semibold py-0.5 mr-2">{description}</p>
                </div>
              </div>
            </div>
        </div>
    </div>}
    </div>
  );
}

export default App;
