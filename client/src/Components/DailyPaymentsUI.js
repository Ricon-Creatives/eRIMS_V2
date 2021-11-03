import React, { Component } from "react";
import { Card, Button } from "reactstrap";

const DailyPaymentsUI =(props) => {
  const {apt, aptCount} = props;
  
    return (

      <div className="card spacer bg-light border-dark mb-3" >
            <div className="card-body">
                <p className="card-title">Amount Payed Today</p>
                
                <div className="card-subtitle mb-2 text-muted">
                    <a href="/payment-table"><h2>GH₵{aptCount}</h2></a>
                </div>
                <p>Recorded Transactions</p>
            </div>
        </div>
    );
  
}
export default DailyPaymentsUI