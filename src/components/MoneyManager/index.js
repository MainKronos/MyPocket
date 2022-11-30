import { Component } from 'react'
import { Layout, Typography, Card, Row, Col } from 'antd';

import TransactionHistory from '../TransactionHistory'
import MoneyDetails from '../MoneyDetails'
import TransactionInput from '../TransactionInput'

import {transactionTypeOptions, UUID} from '../utils'

// import './index.scss'

const { Content } = Layout;
const { Title } = Typography;


class MoneyManager extends Component {

	constructor(props) {
		super(props)

		let localTransaction = localStorage.getItem('transactionsList');

		if(!localTransaction){
			localTransaction = [];
			localStorage.setItem('transactionsList', JSON.stringify([]));
		}else{
			localTransaction = JSON.parse(localTransaction);
		}

		this.state = {
			transactionsList: localTransaction
		}
	}

	syncronize = (updatedTransactionList) => {
		
		localStorage.setItem('transactionsList', JSON.stringify(updatedTransactionList));
		this.setState({transactionsList: updatedTransactionList});
	}

	deleteTransaction = id => {
		const { transactionsList } = this.state;
		const updatedTransactionList = transactionsList.filter(
			eachTransaction => id !== eachTransaction.id,
		);

		this.syncronize(updatedTransactionList);
	}

	addTransaction = (titleInput, amountInput, timestampInput, typeInput) => {
		const newTransaction = {
			id: UUID(),
			title: titleInput,
			amount: amountInput,
			timestamp: timestampInput,
			type: typeInput,
		}

		const { transactionsList } = this.state;

		this.syncronize([...transactionsList, newTransaction].sort((a,b)=>{return(b.timestamp-a.timestamp)}));
	}

	getExpenses = () => {
		const { transactionsList } = this.state
		let expensesAmount = 0

		transactionsList.forEach(eachTransaction => {
			if (eachTransaction.type === transactionTypeOptions[1]) {
				expensesAmount += eachTransaction.amount
			}
		})

		return expensesAmount
	}

	getIncome = () => {
		const { transactionsList } = this.state
		let incomeAmount = 0
		transactionsList.forEach(eachTransaction => {
			if (eachTransaction.type === transactionTypeOptions[0]) {
				incomeAmount += eachTransaction.amount
			}
		})

		return incomeAmount
	}

	getBalance = () => {
		const { transactionsList } = this.state
		let balanceAmount = 0
		let incomeAmount = 0
		let expensesAmount = 0

		transactionsList.forEach(eachTransaction => {
			if (eachTransaction.type === transactionTypeOptions[0]) {
				incomeAmount += eachTransaction.amount
			} else {
				expensesAmount += eachTransaction.amount
			}
		})

		balanceAmount = incomeAmount - expensesAmount

		return balanceAmount
	}

	render() {
		const { transactionsList } = this.state

		return (
			<Content>
				<Row gutter={[48, 48]}>
					<MoneyHeader/>
					<MoneyDetails
						balanceAmount={this.getBalance()}
						incomeAmount={this.getIncome()}
						expensesAmount={this.getExpenses()}
					/>
					<TransactionInput
						addTransaction={this.addTransaction}
					/>
					<TransactionHistory 
						transactionsList={transactionsList}
						deleteTransaction={this.deleteTransaction}
					/>
				</Row>
			</Content>	
		)
	}
}

function MoneyHeader(props){
	return (
		<Col span={24}>
			<Card>
				<Title level={1}>Hi, MainKronos</Title>
				<Title level={3}>
					Welcome back to your <em>Money Manager</em>
				</Title>
			</Card>
		</Col>
	);
}


export default MoneyManager
