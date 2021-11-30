import React from 'react'

export default function Transaction( {transaction} ) {
    return (
        <div className = "transaction-box">
            {transaction.name}
        </div>
    )
}
