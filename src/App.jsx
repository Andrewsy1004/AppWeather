import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [formData, setFormData] = useState({
    city: '',
    pais: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleFetchData = async () => {
    const { city, pais } = formData;

    if (city.trim() === '' || pais.trim() === '') {
      setErrors({
        city: city.trim() === '',
        pais: pais.trim() === '',
      });
    } else {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city},${pais}&appid=${process.env.appid}`
        );

        setWeatherData(response.data);
        setFormData({ city: '', pais: '' });
        setErrors({});
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }
  };

  return (
    <div className="container mt-2">
      <div className="card">
        <div className="card-header bold text-primary">
          <h1>Weather App</h1>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="city">Enter city</label>
              <input
                type="text"
                id="city"
                name="city"
                className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                value={formData.city}
                onChange={handleInputChange}
                placeholder={errors.city ? 'City is required' : 'Enter city'}
              />
              {errors.city && <div className="invalid-feedback">City is required</div>}
            </div>
            <div className="form-group mt-2">
              <label htmlFor="country">Enter country</label>
              <input
                type="text"
                id="country"
                name="pais"
                className={`form-control ${errors.pais ? 'is-invalid' : ''}`}
                value={formData.pais}
                onChange={handleInputChange}
                placeholder={errors.pais ? 'Country is required' : 'Enter country'}
              />
              {errors.pais && <div className="invalid-feedback">Country is required</div>}
            </div>
            <button
              className="btn btn-primary mt-2 w-100"
              type="button"
              onClick={handleFetchData}
            >
              Search
            </button>
          </form>
        </div>
        {weatherData && (
          <div className="card-footer text-center">
            <h2>
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {weatherData.name}, {weatherData.sys.country}
            </h2>
            <p>
              <FontAwesomeIcon icon={faTemperatureHigh} /> Temperature: {weatherData.main.temp} Kelvin
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
