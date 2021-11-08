import React from 'react';
import { Card, Button } from "reactstrap";




const AgentsUI = (props) => {
    const { collectors, collectorNumber } = props;
    console.log(collectors);
    
    return (
        <div className="card bg-light spacer border-dark mb-3">
            <div className="card-body">
                <p className="card-title">Registered Agents</p>
                
                <div className="card-subtitle mb-2 text-muted">
                    <a href="/payee-table"><h2>{collectorNumber}</h2></a>
                </div>
                <p>Registered Agents on the system</p>
            </div>
        </div>

    )
}

export default AgentsUI
