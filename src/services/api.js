import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const getFlights = (airport) => {
    const url = `${API_BASE_URL}/flights?airport=${airport}`;
    console.log(`GET Request to: ${url}`);
    return axios.get(url)
        .then((response) => {
            console.log('Response:', response.data);
            return response;
        })
        .catch((error) => {
            console.error('Error in GET /flights:', error);
            throw error;
        });
};

export const addFlight = (flight) => {
    const url = `${API_BASE_URL}/flights`;
    console.log(`POST Request to: ${url}`, flight);
    return axios.post(url, flight)
        .then((response) => {
            console.log('Response:', response.data);
            return response;
        })
        .catch((error) => {
            console.error('Error in POST /flights:', error);
            throw error;
        });
};

export const deleteFlight = (flightId) => {
    const url = `${API_BASE_URL}/flights/${flightId}`;
    console.log(`DELETE Request to: ${url}`);
    return axios.delete(url)
        .then((response) => {
            console.log('Response:', response.data);
            return response;
        })
        .catch((error) => {
            console.error('Error in DELETE /flights:', error);
            throw error;
        });
};