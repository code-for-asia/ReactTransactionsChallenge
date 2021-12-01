import React from 'react'


function getTransactionColor(transaction){
    if (transaction.income){
        return "income-history"
    }
    else{
        return "expense-history"
    }

}

export default function Transaction( {transaction} ) {
    return (
        <div className = "transaction-box">
            {transaction.name}
            <span className = {getTransactionColor(transaction)}>
                $ {(Math.round(transaction.amount * 100) / 100).toFixed(2)}
            </span>
            
        </div>
    )
}
