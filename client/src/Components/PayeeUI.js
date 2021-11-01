import React from 'react';
import { Card, Button } from "tabler-react";




const PayeeUI = (props) => {
    const { payeeCount } = props;
    console.log(payeeCount);
    
    return (
        <Card>
            <Card.Header>
            <Card.Title>Registered Tax Payers</Card.Title>
            </Card.Header>
            <Card.Body>
                <a href="/payee-table"><h1>{payeeCount}</h1></a>
                <h4>Registered Users</h4>
            
            </Card.Body>
        </Card>

    )
}

export default PayeeUI
