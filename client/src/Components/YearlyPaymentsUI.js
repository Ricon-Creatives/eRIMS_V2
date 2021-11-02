import React from 'react';
import { Card, Button } from "reactstrap";


const YearlyPaymentsUI = (props) => {
    const {apy, apyCount} = props;

    return (
        <div className="card spacer bg-light border-dark mb-3">
            <div className="card-body">
                <p className="card-title">Revenue Collected This Year</p>
                
                <div className="card-subtitle mb-2 text-muted">
                    <a href="/payee-table"><h2>GH₵12000</h2></a>
                </div>
                <p>Recorded Transactions</p>
            </div>
        </div>
    )
}

export default YearlyPaymentsUI;
