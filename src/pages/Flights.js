import React, { useState, useEffect } from 'react';
import { getFlights } from '../services/api';

const Flights = () => {
    const [flights, setFlights] = useState([]);
    const [airport, setAirport] = useState('JFK'); // Default airport

    useEffect(() => {
        getFlights(airport)
            .then((response) => setFlights(response.data))
            .catch((error) => {
                console.error('Error fetching flights:', error);
                alert('Failed to fetch flights. Please check the backend server or API URL.');
            });
    }, [airport]);

    return (
        <div>
            <h1>Flights for {airport}</h1>
            <select onChange={(e) => setAirport(e.target.value)}>
                <option value="JFK">JFK</option>
                <option value="LAX">LAX</option>
                <option value="ORD">ORD</option>
            </select>
            <ul>
                {flights.map((flight) => (
                    <li key={flight.id}>
                        {flight.flightNumber} - {flight.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Flights;