import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const getFlights = (airport) => axios.get(`${API_BASE_URL}/flights?airport=${airport}`);
export const addFlight = (flight) => axios.post(`${API_BASE_URL}/flights`, flight);
export const deleteFlight = (flightId) => axios.delete(`${API_BASE_URL}/flights/${flightId}`);