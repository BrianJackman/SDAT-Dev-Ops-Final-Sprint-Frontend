// Author: Brian Jackman
// Date: 2025/04/18
// Project: SDAT & Dev Ops Final Sprint

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';


export const getFlights = async (airport) => {
    const url = `${API_BASE_URL}/flights?airport=${airport}`;
    try {
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.error('Error in GET /flights:', error);
        throw error;
    }
};


export const addFlight = async (flight) => {
    const url = `${API_BASE_URL}/flights`;
    try {
        const response = await axios.post(url, flight);
        return response;
    } catch (error) {
        console.error('Error in POST /flights:', error);
        throw error;
    }
};


export const deleteFlight = async (flightId) => {
    const url = `${API_BASE_URL}/flights/${flightId}`;
    try {
        const response = await axios.delete(url);
        return response;
    } catch (error) {
        console.error('Error in DELETE /flights:', error);
        throw error;
    }
};