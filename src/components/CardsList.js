import React from 'react';
import { Table } from 'react-bootstrap';
const CardsList = () => {
    
    const cards = JSON.parse(sessionStorage.getItem('storedCards')) || [];

    if(!cards) return;

    return (
      <Table striped bordered hover className='mt-5'>
        <thead>
          <tr>
            <th>#</th>
            <th>Card Number</th>
            <th>Card Name</th>
            <th>Card Type</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((c, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{c.cardNumber}</td>
              <td>{c.cardName}</td>
              <td>{c.cardType}</td>
              <td>{c.country}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };
export default CardsList;