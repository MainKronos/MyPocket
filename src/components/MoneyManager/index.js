import { Component } from 'react'

import TransactionHistory from '../TransactionHistory'
import MoneyDetails from '../MoneyDetails'

import './index.scss'

function UUID() {
	let
		d = new Date().getTime(),
		d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
		let r = Math.random() * 16;
		if (d > 0) {
			r = (d + r) % 16 | 0;
			d = Math.floor(d / 16);
		} else {
			r = (d2 + r) % 16 | 0;
			d2 = Math.floor(d2 / 16);
		}
		return (c === 'x' ? r : ((r & 0x7) | 0x8)).toString(16);
	});
}

const transactionTypeOptions = [
	{
		optionId: 'INCOME',
		displayText: 'Income',
	},
	{
		optionId: 'EXPENSES',
		displayText: 'Expenses',
	},
]

class MoneyManager extends Component {
	state = {
		transactionsList: [],
		titleInput: '',
		amountInput: '',
		dateInput: new Date(new Date().setUTCHours(0, 0, 0, 0)),
		optionId: transactionTypeOptions[0].optionId,
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

	onAddTransaction = event => {
		event.preventDefault()
		const { titleInput, amountInput, dateInput, optionId } = this.state
		const typeOption = transactionTypeOptions.find(
			eachTransaction => eachTransaction.optionId === optionId,
		)
		const { displayText } = typeOption
		const newTransaction = {
			id: UUID(),
			title: titleInput,
			amount: amountInput,
			date: dateInput,
			type: displayText,
		}

		this.setState(prevState => ({
			transactionsList: [...prevState.transactionsList, newTransaction],
			titleInput: '',
			amountInput: '',
			dateInput: new Date(new Date().setUTCHours(0, 0, 0, 0)),
			optionId: transactionTypeOptions[0].optionId,
		}))
	}

	onChangeOptionId = event => {
		this.setState({ optionId: event.target.value })
	}

	onChangeAmountInput = event => {
		this.setState({ amountInput: parseFloat(event.target.value) })
	}

	onChangeDateInput = event => {
		this.setState({ dateInput: new Date(event.target.value) })
	}

	onChangeTitleInput = event => {
		this.setState({ titleInput: event.target.value })
	}

	getExpenses = () => {
		const { transactionsList } = this.state
		let expensesAmount = 0

		transactionsList.forEach(eachTransaction => {
			if (eachTransaction.type === transactionTypeOptions[1].displayText) {
				expensesAmount += eachTransaction.amount
			}
		})

		return expensesAmount
	}

	getIncome = () => {
		const { transactionsList } = this.state
		let incomeAmount = 0
		transactionsList.forEach(eachTransaction => {
			if (eachTransaction.type === transactionTypeOptions[0].displayText) {
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
			if (eachTransaction.type === transactionTypeOptions[0].displayText) {
				incomeAmount += eachTransaction.amount
			} else {
				expensesAmount += eachTransaction.amount
			}
		})

		balanceAmount = incomeAmount - expensesAmount

		return balanceAmount
	}

	render() {
		const { titleInput, amountInput, dateInput, optionId, transactionsList } = this.state
		const balanceAmount = this.getBalance()
		const incomeAmount = this.getIncome()
		const expensesAmount = this.getExpenses()

		return (
			<div className="container">
				<header>
					<h1>Hi, Richard</h1>
					<h3>
						Welcome back to your <em>Money Manager</em>
					</h3>
					
				</header>
				<MoneyDetails
					balanceAmount={balanceAmount}
					incomeAmount={incomeAmount}
					expensesAmount={expensesAmount}
				/>
				<aside className="transaction-details">
					<form onSubmit={this.onAddTransaction}>
						<h2>Add Transaction</h2>
						<label htmlFor="title">
							TITLE
						</label>
						<input
							type="text"
							id="title"
							value={titleInput}
							onChange={this.onChangeTitleInput}
							placeholder="TITLE"
							required
						/>
						<label htmlFor="amount">
							AMOUNT
						</label>
						<input
							type="number"
							id="amount"
							value={amountInput}
							step=".01"
							min={0.01}
							onChange={this.onChangeAmountInput}
							placeholder="AMOUNT"
							required
						/>
						<label htmlFor="date">
							DATE
						</label>
						<input
							type="date"
							id="date"
							value={dateInput.toISOString().substring(0, 10)}
							onChange={this.onChangeDateInput}
							required
						/>
						<label htmlFor="select">
							TYPE
						</label>
						<select
							id="select"
							value={optionId}
							onChange={this.onChangeOptionId}
						>
							{transactionTypeOptions.map(eachOption => (
								<option key={eachOption.optionId} value={eachOption.optionId}>
									{eachOption.displayText}
								</option>
							))}
						</select>
						<button type="submit">
							Add
						</button>
					</form>
				</aside>
					<section className="history-transactions">
						<h2>History</h2>
						<table>
							<thead>
								<tr>
									<th>Title</th>
									<th>Amount</th>
									<th>Date</th>
									<th>Type</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{transactionsList.map(eachTransaction => (
									<TransactionHistory
										key={eachTransaction.id}
										transactionDetails={eachTransaction}
										deleteTransaction={this.deleteTransaction}
									/>
								))}
							</tbody>
						</table>
					</section>
			</div>
		)
	}
}

export default MoneyManager
