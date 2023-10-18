import React, { useState } from "react";
import { Button, Card, ListGroup, Form } from 'react-bootstrap';

const ListCountries = ({ countries, setStoredCountries }) => {

    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState('');


    // Function to handle deletion of a country
    const handleDelete = (index) => {
        // Create a new array excluding the item to be deleted
        const updatedCountries = countries.filter((_, i) => i !== index);

        // Update state and sessionStorage
        setStoredCountries(updatedCountries);
        sessionStorage.setItem('countriesData', JSON.stringify(updatedCountries));
    };

    // Function to handle editing of a country
    const handleEdit = (index) => {
        setEditIndex(index);
        setEditValue(countries[index].countryName);
    };

    // Function to handle updating the edited country
    const handleUpdate = (index) => {
        const updatedCountries = [...countries];
        updatedCountries[index].countryName = editValue;

        setStoredCountries(updatedCountries);
        sessionStorage.setItem('countriesData', JSON.stringify(updatedCountries));

        // Reset edit state
        setEditIndex(null);
        setEditValue('');
    };

    return (
        <div className="list">
            <Card>
                <Card.Header><strong>Banned countries list</strong></Card.Header>
                <ListGroup variant="flush">

                    {/* Display a message if no countries are present */}
                    {!countries.length && (
                        <ListGroup.Item>No countries</ListGroup.Item>
                    )}

                    {/* Display each country with a delete button */}
                    {countries.map((c, i) => (
                        <ListGroup.Item key={i} className="d-flex justify-content-between align-items-center">
                            {editIndex === i ? (
                                    <Form.Control
                                        type="text"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                    />
                                ) : (
                                    c.countryName
                                )}
                            <div>
                                {editIndex === i ? (
                                    <Button variant="success" size="sm" onClick={() => handleUpdate(i)}>Update</Button>
                                ) : (
                                    <>
                                        <Button className="mx-1" variant="danger" size="sm" onClick={() => handleDelete(i)}>Delete</Button>
                                        <Button className="mx-1" variant="info" size="sm" onClick={() => handleEdit(i)}>Edit</Button>
                                    </>
                                )}
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
        </div>
    );
}

export default ListCountries;