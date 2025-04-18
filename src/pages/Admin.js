import React, { useState, useEffect } from 'react';
import { getFlights, addFlight, deleteFlight } from '../services/api';

const Admin = () => {
    const [flight, setFlight] = useState({
        flightNumber: '',
        status: '',
    });
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        getFlights('JFK') // Replace 'JFK' with the desired airport
            .then((response) => setFlights(response.data))
            .catch((error) => console.error('Error fetching flights:', error));
    }, []);

    const handleAddFlight = () => {
        if (!flight.flightNumber || !flight.status) {
            alert('Please fill in all fields.');
            return;
        }

        if (flight.id) {
            // Edit existing flight
            addFlight(flight) // Replace with an `updateFlight` API call if available
                .then(() => {
                    alert('Flight updated successfully!');
                    setFlights(flights.map((f) => (f.id === flight.id ? flight : f))); // Update the list
                    setFlight({ flightNumber: '', status: '' }); // Reset form
                })
                .catch((error) => {
                    console.error('Error updating flight:', error);
                    alert('Failed to update flight. Please try again.');
                });
        } else {
            // Add new flight
            addFlight(flight)
                .then(() => {
                    alert('Flight added successfully!');
                    setFlights([...flights, flight]); // Add to the list
                    setFlight({ flightNumber: '', status: '' }); // Reset form
                })
                .catch((error) => {
                    console.error('Error adding flight:', error);
                    alert('Failed to add flight. Please try again.');
                });
        }
    };

    const handleDeleteFlight = (flightId) => {
        deleteFlight(flightId)
            .then(() => {
                alert('Flight deleted successfully!');
                setFlights(flights.filter((flight) => flight.id !== flightId)); // Update the list
            })
            .catch((error) => {
                console.error('Error deleting flight:', error);
                alert('Failed to delete flight. Please try again.');
            });
    };

    const handleEditFlight = (flight) => {
        setFlight(flight); // Populate the form with the selected flight's details
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
                <button
                    className="btn btn-primary"
                    onClick={handleAddFlight}
                >
                    {flight.id ? 'Update Flight' : 'Add Flight'}
                </button>
            </div>
            <h2 className="mb-3">Manage Flights</h2>
            <ul className="list-group">
                {flights.map((flight) => (
                    <li key={flight.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>
                            <strong>{flight.flightNumber}</strong> - {flight.status}
                        </span>
                        <div>
                            <button
                                className="btn btn-sm btn-warning me-2"
                                onClick={() => handleEditFlight(flight)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDeleteFlight(flight.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Admin;