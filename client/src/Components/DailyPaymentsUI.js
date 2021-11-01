import React, { Component } from "react";
import "tabler-react/dist/Tabler.css";

import { Card, Button } from "tabler-react";

const DailyPaymentsUI =(props) => {
  const {apt, aptCount} = props;
  
    return (
    
      <Card>
        <Card.Header>
          <Card.Title>Amount Payed Today</Card.Title>
        </Card.Header>
        <Card.Body>
            <a href="/payment-table"><h1>GH₵ {aptCount}</h1></a>
            <h4>Recorded Transactions </h4>
        </Card.Body>
      </Card>
    );
  
}
export default DailyPaymentsUI