import React, { useState } from "react";
import ListCountries from './ListCountries';
import { Button, Form, Alert, Row, Col } from "react-bootstrap";

const BannedCountries = () => {
    const timeout = 5000;
    const [countryName, setCountryName] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [response, setResponse] = useState(null);
    const [storedCountries, setStoredCountries] = useState(
        JSON.parse(sessionStorage.getItem('countriesData')) || []
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!countryName || !countryCode) {
            showResponse("Country and country code are required.", "danger");
        } else if (countryExists(countryName)) {
            showResponse("Country found, please try with a different country.", "danger");
        } else {
            const newCountry = [...storedCountries, { countryName, countryCode }];
            updateStoredCountries(newCountry);
            showResponse("Country added successfully!", "success");
            clearInputs();

            // Clear success message after 2 seconds
            setTimeout(() => {
                clearResponse();
            }, timeout);
        }
    }

    const showResponse = (message, variant) => {
        setResponse({ show: true, message, variant });
    };

    const clearResponse = () => {
        setResponse({ show: false, message: "", variant: "" });
    };

    const countryExists = (name) => {
        return storedCountries.some((country) => country.countryName === name);
    };

    const updateStoredCountries = (countries) => {
        sessionStorage.setItem('countriesData', JSON.stringify(countries));
        setStoredCountries(countries);
    };

    const clearInputs = () => {
        setCountryName('');
        setCountryCode('');
    }

    return (
        <>
            <h3 className="header">Banned Countries</h3>

            <Form>
                <Row>
                    <Col>
                        <Form.Control
                            type="text"
                            id="countryName"
                            className="formControl"
                            name="countryName"
                            placeholder="Country Name"
                            value={countryName}
                            onChange={(e) => setCountryName(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Control
                            type="text"
                            id="countryCode"
                            className="formControl"
                            data-testid="countryCode"
                            name="countryCode"
                            placeholder="Country Code"
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                        />
                    </Col>
                </Row>

                <Button
                    size="block"
                    data-testid="validateButton"
                    id="validateButton"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Form>

            {response && response.show && (
                <Alert
                    id="alertMessage"
                    data-testid="alertMessage"
                    variant={response.variant}
                    show={response.show}
                    onClose={clearResponse}
                    dismissible
                >
                    {response.message}
                </Alert>
            )}

            <ListCountries
                countries={storedCountries}
                setStoredCountries={setStoredCountries}
            />
        </>
    );
}

export default BannedCountries;