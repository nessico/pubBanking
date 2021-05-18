import { Client, UserTransactions, User, LedgerEntry, IUser } from "../models/api";
import React, { useState, useEffect, FC, useContext } from "react";
import { Row, Col, Card } from "antd";
import { UserTransactionTable } from "../components/UserTransactionTable";
import { MoneyTransferForm } from "../components/MoneyTransferForm";

const client = new Client()

export interface UserPageProps {
    user: IUser,
    canDeposit: boolean,
}

export const UserPage: FC<UserPageProps> = ({ user, canDeposit }) => {
    const [balance, setBalance] = useState<number>(0)
    const [transactions, setTransactions] = useState<LedgerEntry[]>([])

    useEffect(() => {
        client.getUserTransactions(user.id).then(
            (data: UserTransactions) => {
                setBalance(data.balance)
                setTransactions(data.transactions)
            })
    }, [user, setBalance, setTransactions])

    return (
        <React.Fragment>
            <Row>
                <Card className="headerInfo">
                    <Row>
                        <Col span={12}>
                            <span>Welcome</span>
                            <p>{user.name}!</p>
                            <em />
                        </Col>
                        <Col span={12}>
                            <span>Balance</span>
                            <p>${balance.toFixed(2)}</p>
                        </Col>
                    </Row>
                </Card>
            </Row>
            <Row>
                <MoneyTransferForm
                    balance={balance}
                    buttonText={canDeposit ? "Add transaction" : "Send money"}
                    canDeposit={canDeposit}
                    user={user} />
            </Row>
            <UserTransactionTable transactions={transactions} />
        </React.Fragment>
    )
}