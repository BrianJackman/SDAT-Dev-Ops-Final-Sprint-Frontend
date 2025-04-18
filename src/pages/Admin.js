// Author: Brian Jackman
// Date: 2025/04/18
// Project: SDAT & Dev Ops Final Sprint

import React, { useState, useEffect } from 'react';
import { getFlights, addFlight, deleteFlight } from '../services/api';

const Admin = () => {
    const [flight, setFlight] = useState({ flightNumber: '', status: '' });
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        fetchFlights();
    }, []);

    const fetchFlights = async () => {
        try {
            const response = await getFlights('JFK');
            setFlights(response.data);
        } catch (error) {
            console.error('Error fetching flights:', error);
        }
    };

    const handleAddFlight = async () => {
        if (!flight.flightNumber || !flight.status) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            await addFlight(flight);
            alert('Flight added successfully!');
            setFlights([...flights, flight]);
            setFlight({ flightNumber: '', status: '' }); // Reset form
        } catch (error) {
            console.error('Error adding flight:', error);
            alert('Failed to add flight. Please try again.');
        }
    };


    const handleDeleteFlight = async (flightId) => {
        try {
            await deleteFlight(flightId);
            alert('Flight deleted successfully!');
            setFlights(flights.filter((flight) => flight.id !== flightId));
        } catch (error) {
            console.error('Error deleting flight:', error);
            alert('Failed to delete flight. Please try again.');
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Admin Section</h1>
            <div className="card p-4 mb-4">
                <h2 className="mb-3">Add or Edit Flight</h2>
                <div className="mb-3">
                    <label htmlFor="flightNumber" className="form-label">
                        Flight Number
                    </label>
                    <input
                        type="text"
                        id="flightNumber"
                        className="form-control"
                        placeholder="Flight Number"
                        value={flight.flightNumber}
                        onChange={(e) => setFlight({ ...flight, flightNumber: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                        Status
                    </label>
                    <input
                        type="text"
                        id="status"
                        className="form-control"
                        placeholder="Status"
                        value={flight.status}
                        onChange={(e) => setFlight({ ...flight, status: e.target.value })}
                    />
                </div>
                <button className="btn btn-primary" onClick={handleAddFlight}>
                    Add Flight
                </button>
            </div>
            <h2 className="mb-3">Manage Flights</h2>
            <ul className="list-group">
                {flights.map((flight) => (
                    <li key={flight.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>
                            <strong>{flight.flightNumber}</strong> - {flight.status}
                        </span>
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteFlight(flight.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Admin;