import { Component, Fragment } from 'react'

import TransactionHistory from '../TransactionHistory'
import MoneyDetails from '../MoneyDetails'
import TransactionInput from '../TransactionInput'

import {transactionTypeOptions, UUID} from '../utils'

import './index.scss'

class MoneyManager extends Component {

	constructor(props) {
		super(props)
		this.state = {
			transactionsList: [],
		}
	}

	syncronize = () => {
		let transactionsList = localStorage.getItem('transactionsList');
		if(transactionsList == null){
			transactionsList = [];
		}
		this.setState({transactionsList: transactionsList,})
	}

	deleteTransaction = id => {
		const { transactionsList } = this.state
		const updatedTransactionList = transactionsList.filter(
			eachTransaction => id !== eachTransaction.id,
		)

		this.setState({
			transactionsList: updatedTransactionList,
		})
	}

	addTransaction = (titleInput, amountInput, dateInput, typeInput) => {
		const newTransaction = {
			id: UUID(),
			title: titleInput,
			amount: amountInput,
			date: dateInput,
			type: typeInput,
		}

		this.setState(prevState => ({
			transactionsList: [...prevState.transactionsList, newTransaction].sort((a,b)=>{return(b.date-a.date)})
		}));
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
			<Fragment>
				<header>
					<h1>Hi, MainKronos</h1>
					<h3>
						Welcome back to your <em>Money Manager</em>
					</h3>
					
				</header>
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
			</Fragment>
		)
	}
}


export default MoneyManager
