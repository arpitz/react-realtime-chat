import React, { useContext } from 'react';
import { GlobalContext } from '../GlobalContext/GlobalState';
import Transaction from './Transaction';

const TransactionList = () => {
    const { transactions } = useContext(GlobalContext);
    return (
        <>
            <h3>History</h3>
            <ul className="list">
                {
                    transactions.map(trans => <Transaction key={trans.id} transaction={trans} />)
                }
            </ul>
        </>
    )
}

export default TransactionList;