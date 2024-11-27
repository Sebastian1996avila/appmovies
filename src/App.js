import React, { useState } from 'react';
import axios from 'axios';
import { saveSearchHistory } from './turso';  // Importa la función saveSearchHistory desde turso.js
import './App.css';

const App = () => {
  const [movieTitle, setMovieTitle] = useState('');
  const [movieData, setMovieData] = useState(null);
  const [error, setError] = useState('');

  const apiKey = 'f9017301'; // Reemplaza con tu clave API de OMDb

  const handleSearch = async () => {
    if (!movieTitle) return;

    try {
      // Realiza la solicitud a la API de OMDb
      const response = await axios.get(`https://www.omdbapi.com/?t=${movieTitle}&apikey=${apiKey}`);
      
      if (response.data.Response === 'True') {
        setMovieData(response.data);
        setError('');

        // Almacenar la búsqueda en Turso
        await saveSearchHistory(movieTitle);  // Guardamos la búsqueda en Turso
      } else {
        setError(response.data.Error || 'Movie not found!');
        setMovieData(null);
      }
    } catch (err) {
      setError('Error fetching data.');
      setMovieData(null);
    }
  };

  return (
    <div className="App">
      <h1>Movie Search</h1>
      <input
        type="text"
        placeholder="Enter movie title"
        value={movieTitle}
        onChange={(e) => setMovieTitle(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p>{error}</p>}

      {movieData && (
        <div className="movie-info">
          <h2>{movieData.Title}</h2>
          <img src={movieData.Poster} alt={movieData.Title} />
          <p><strong>Year:</strong> {movieData.Year}</p>
          <p><strong>Genre:</strong> {movieData.Genre}</p>
          <p><strong>Plot:</strong> {movieData.Plot}</p>
        </div>
      )}
    </div>
  );
};

export default App;
