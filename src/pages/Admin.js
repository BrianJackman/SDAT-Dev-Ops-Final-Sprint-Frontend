import React, { useState } from 'react';
import { addFlight } from '../services/api';

const Admin = () => {
    const [flight, setFlight] = useState({
        flightNumber: '',
        status: '',
    });

    const handleAddFlight = () => {
        if (!flight.flightNumber || !flight.status) {
            alert('Please fill in all fields.');
            return;
        }

        addFlight(flight)
            .then(() => {
                alert('Flight added successfully!');
                setFlight({ flightNumber: '', status: '' }); // Reset form
            })
            .catch((error) => {
                console.error('Error adding flight:', error);
                alert('Failed to add flight. Please try again.');
            });
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
                <button onClick={handleAddFlight}>Add Flight</button>
            </div>
        </div>
    );
};

export default Admin;