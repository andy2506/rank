import React, { useState } from "react";
import useForm from "../useForm";
import { Button, Form, Alert, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreditCardForm.css";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";


const CreditCardForm = () => {

  const timeout = 5000;

  const { handleChange, handleFocus, handleSubmit, values, errors } = useForm();
  
  const [response, setResponse] = useState(null);

  //an object to store the card details
  const [storedCards, setStoredCards] = useState(
    JSON.parse(sessionStorage.getItem('storedCards')) || []
  );

  //save to storage function
  const saveToStorage = () => {
    
      //check if the errors are all good first
      if(errors && errors.passed){
        if(cardExists(values.cardNumber)){
          showResponse("Card already exist, please try with different card.", "danger");
        }else if(isBanned(values.country)){
          showResponse("Country is on the banned list, try with different country.", "danger");
        }else{
          const newCard = [...storedCards, values ];
          updateStoredCards(newCard);
          showResponse("Card added successfully!", "success");
        }
      }else{
        console.log("ERRR ", errors);
        console.log("ERRR msg ", errors.message);
        showResponse(errors.message || "", "danger");
      }
      setTimeout(() => { clearResponse() }, timeout);
  }

  const cardExists = (number) => {
    return storedCards.some((card) => card.cardNumber === number);
  };

  const isBanned = (country) => {
    const bannedCountries = JSON.parse(sessionStorage.getItem('countriesData')) || [];
    return bannedCountries.some((c) => c.countryName === country);
  };

  const showResponse = (message, variant) => {
    setResponse({ show: true, message, variant });
  };

  const updateStoredCards = (cards) => {
    sessionStorage.setItem('storedCards', JSON.stringify(cards));
    setStoredCards(cards);
  };

  const clearResponse = () => {
    setResponse({ show: false, message: "", variant: "" });
  };

  return (
      <div className="form-container">
        {/* <div className="box justify-content-center align-items-center"> */}
        <div className="box">
          <div className="formDiv">
          <div className="creditCard">
          <Cards
            cvc={values.cardSecurityCode}
            expiry={values.cardExpiration}
            focused={values.focus}
            name={values.cardName}
            number={values.cardNumber}
          />
          </div>
          <Form onSubmit={(e)=> {
            handleSubmit(e)
            saveToStorage();
          }}>
            <Row>
                <Form.Group>
                <Form.Control
                    type="text"
                    id="cardName"
                    className="formControl"
                    data-testid="cardName"
                    name="cardName"
                    placeholder="Cardholder Name"
                    value={values.cardName}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    isValid={errors.cname}
                />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group>
                <Form.Control
                    type="number"
                    id="cardNumber"
                    className="formControl"
                    data-testid="cardNumber"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={values.cardNumber}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    isValid={errors.cnumber}
                />
                </Form.Group>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="cardType"
                    id="cardType"
                    className="formControl"
                    data-testid="cardType"
                    placeholder="Card Type"
                    value={values.cardType}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    isValid={errors.ctype}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="text"
                    id="cardExpiration"
                    className="formControl"
                    data-testid="cardExpiration"
                    name="cardExpiration"
                    placeholder="Expiration Date"
                    value={values.cardExpiration}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    isValid={errors.cexp}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="number"
                    id="cardSecurityCode"
                    className="formControl"
                    data-testid="cardSecurityCode"
                    name="cardSecurityCode"
                    placeholder="Security Code"
                    value={values.cardSecurityCode}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    isValid={errors.ccvv}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="text"
                    id="country"
                    className="formControl"
                    data-testid="country"
                    name="country"
                    placeholder="Country"
                    value={values.country}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    isValid={errors.country}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button
              size={"block"}
              data-testid="validateButton"
              id="validateButton"
              type="submit"
            >
              Submit
            </Button>
          </Form>
          </div>
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
        </div>
      </div>
  );
};

export default CreditCardForm;