import React from 'react';
import { Card, Button } from "reactstrap";


const MonthlyPaymentsUI = (props) => {
    const {apm, apmCount} = props;



    return (

        <div className="card bg-light spacer border-dark mb-3">
            <div className="card-body">
                <p className="card-title">Revenue Collected This Month</p>
                
                <div className="card-subtitle mb-2 text-muted">
                    <a href="/payee-table"><h2>GH₵3000</h2></a>
                </div>
                <p>Recorded Transactions</p>
            </div>
        </div>
    )
}

export default MonthlyPaymentsUI;
