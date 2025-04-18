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
        <div className="container mt-4">
            <h1 className="text-center mb-4">Flights for {airport}</h1>
            <div className="mb-3">
                <label htmlFor="airportSelect" className="form-label">
                    Select Airport:
                </label>
                <select
                    id="airportSelect"
                    className="form-select"
                    onChange={(e) => setAirport(e.target.value)}
                >
                    <option value="JFK">JFK</option>
                    <option value="LAX">LAX</option>
                    <option value="ORD">ORD</option>
                </select>
            </div>
            <ul className="list-group">
                {flights.map((flight) => (
                    <li key={flight.id} className="list-group-item">
                        <strong>{flight.flightNumber}</strong> - {flight.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Flights;