import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export default function TransactionsPage() {
    type Transaction = {
        id: number;
        account: any;
        receiver: string;
        amount: number;
        flowType: string;
        category: any;
        localDate: Date;
    }

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        loadTransactions()},[]);

    const loadTransactions = () => {
        axios.get(`http://localhost:8080/transactions`)
            .then(res =>{
                setTransactions(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    const listTransactions = transactions.map((transaction) => {
        console.log(transaction);
        console.log(typeof transaction.localDate)
        // if the type of transaction.localDate is string, why do I have to add toLocaleString to make it display?
        console.log(transaction.id)
        return (
            <tr>
                <td>{transaction.id}</td>
                <td>{transaction.account.iban}</td>
                <td>{transaction.receiver}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.flowType}</td>
                <td>{transaction.category.name}</td>
                <td>{transaction.localDate.toLocaleString()}</td>
                <td>
                    <button onClick={()=>deleteTransaction(transaction.id)}>Delete</button>
                </td>
            </tr>
        )
    })

    const deleteTransaction = async (id: number) => {
        await axios.delete(`http://localhost:8080/transactions/${id}`)
        loadTransactions()
    }

    return (
        <div>
            <h1>Transactions</h1>
            <table>
                <tbody>
                    <tr>
                        <th>#</th>
                        <th>Account</th>
                        <th>Receiver</th>
                        <th>Amount</th>
                        <th>Flow type</th>
                        <th>Category</th>
                        <th>Date</th>
                    </tr>
                    {listTransactions}
                </tbody>
            </table>
            <Link to="/add-transaction">
                <button>Add transaction</button>
            </Link>
        </div>
    )
}