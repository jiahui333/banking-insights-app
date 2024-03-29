import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useLocation, useParams} from "react-router-dom";
import type {Transaction} from "../../types/TransactionType";
import {PageButton} from "../../components/Buttons";
import {FaRegTrashCan} from "react-icons/fa6";

export default function TransactionsPage() {

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    console.log(useParams());
    console.log("useLocation().state: "+useLocation().state.iban);
    const { iban }= useLocation().state as {iban: string};
    const { id } = useParams() as { id: string };
    const account_id: number = +id

    useEffect(() => {
        loadTransactions(account_id)},[account_id]);

    const loadTransactions = (account_id: number) => {
        axios.get(`https://greeny-insight-backend.fly.dev/accounts/${account_id}/transactions`, { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}`}})
            .then(res =>{
                setTransactions(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    const listTransactions = transactions.map((transaction) => {
        console.log(transaction);
        console.log(typeof transaction.localDate)
        return (
            <tr>
                <td>{transaction.sender}</td>
                <td>{transaction.receiver}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.flowType}</td>
                <td className="big">{transaction.category.name}</td>
                <td>{transaction.localDate}</td>
                <td>{transaction.footprint}</td>
                <td>
                    <button className="text-darkColor160 hover:text-baseColor ml-6" onClick={()=>deleteTransaction(transaction.id)}><FaRegTrashCan/></button>
                </td>
            </tr>
        )
    })

    const deleteTransaction = (transaction_id: number) => {
        axios.delete(`https://greeny-insight-backend.fly.dev/accounts/${account_id}/transactions/${transaction_id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}`}})
            .then(r => loadTransactions(account_id))
    }

    return (
        <div className="flex items-center justify-center flex-col bg-white/90 shadow-xl rounded-lg m-auto py-20 pl-40 pr-16 text-bodyColor180">
            <h1 className="title">Transactions</h1>
            <table className="text-left mb-20">
                <p>Account:&nbsp;{iban}</p>
                <br />
                <tbody>
                    <tr>
                        <th>Sender</th>
                        <th>Receiver</th>
                        <th>Amount</th>
                        <th>Flow type</th>
                        <th className="big">Category</th>
                        <th>Date</th>
                        <th>Footprint</th>
                    </tr>
                    {listTransactions}
                </tbody>
            </table>
            <div className="flex gap-10">
                <Link to={`/accounts/${account_id}/transactions/add`}
                state={{
                    iban: iban
                }}>
                    {PageButton("Add Transaction")}
                </Link>
                <br/>
                <Link to={"/accounts"}>
                    {PageButton("Return to Accounts")}
                </Link>
            </div>
        </div>
    )
}