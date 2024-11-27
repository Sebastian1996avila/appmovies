// src/turso.js
import axios from 'axios';

// Coloca tu endpoint y token de autenticación aquí
const endpoint = "libsql://movies-sebastian96.turso.io"; // reemplaza con tu endpoint de Turso
const token = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MzI3NDYwOTcsImlkIjoiMWM5ODU5MjItZGViOC00YTZjLWE4NTItZjU1MzkwNDQ4Yjg3In0.DYc2qe-ePo7TN1sR__pBLywsci5Tms-GTvaF6IGho-zLvE-3qrg3AnjZV42HRUa7uOuB7yugeMOi1Xy8GvVZDw"; // reemplaza con tu token de autenticación

// Configuración de Axios para Turso
const tursoClient = axios.create({
  baseURL: endpoint,
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

// Función para consultar la base de datos
export const fetchMovieSearchHistory = async () => {
  try {
    const response = await tursoClient.get('/movie_search_history');
    return response.data;  // Aquí verás los registros de búsqueda de películas
  } catch (error) {
    console.error('Error al consultar datos de Turso:', error.response || error.message);
  }
};

// Función para guardar el historial de búsqueda
export const saveSearchHistory = async (movieTitle) => {
  try {
    // Verifica que los datos estén bien formateados
    console.log('Guardando título de película:', movieTitle);

    // Hacemos la petición a la API de Turso para guardar el historial
    const response = await tursoClient.post('/movie_search_history', {
      movie_title: movieTitle
    });

    // Si la respuesta es exitosa, deberías ver algo en la consola
    console.log('Película guardada:', response.data);
  } catch (error) {
    // Si ocurre un error, lo capturamos y lo mostramos en la consola
    console.error('Error al guardar historial:', error.response || error.message);
  }
};
