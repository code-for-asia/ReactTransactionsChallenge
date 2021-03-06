import React from 'react'
import Transaction from './Transaction'

export default function Transactions({ transactions }) {
    return (
        transactions.map(transaction => {
            return <Transaction key = {transaction.id} transaction={transaction} />
        })
    )
}
