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
        <div>
            <h1>Admin Section</h1>
            <div>
                <input
                    type="text"
                    placeholder="Flight Number"
                    value={flight.flightNumber}
                    onChange={(e) => setFlight({ ...flight, flightNumber: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Status"
                    value={flight.status}
                    onChange={(e) => setFlight({ ...flight, status: e.target.value })}
                />
                <button onClick={handleAddFlight}>
                    {flight.id ? 'Update Flight' : 'Add Flight'}
                </button>
            </div>
            <ul>
                {flights.map((flight) => (
                    <li key={flight.id}>
                        {flight.flightNumber} - {flight.status}
                        <button onClick={() => handleEditFlight(flight)}>Edit</button>
                        <button onClick={() => handleDeleteFlight(flight.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Admin;