import { Component } from 'react'

import { transactionTypeOptions } from '../utils'

import './index.scss'

export default class TransactionInput extends Component{
	constructor(props) {
		super(props);
		this.state = {
			titleInput: '',
			amountInput: '',
			timestampInput: new Date().setUTCHours(0, 0, 0, 0),
			typeInput: transactionTypeOptions[0],
		};
	}

	reset = () => {
		this.setState({
			titleInput: '',
			amountInput: '',
			timestampInput: new Date().setUTCHours(0, 0, 0, 0),
			typeInput: transactionTypeOptions[0],
		})
	}
	
	onChangetypeInput = (event) => {
		this.setState({ typeInput: event.target.value })
	}

	onChangeAmountInput = (event) => {
		this.setState({ amountInput: parseFloat(event.target.value) })
	}

	onChangeTimestampInput = (event) => {
		this.setState({ timestampInput: new Date(event.target.value).getTime() })
	}

	onChangeTitleInput = (event) => {
		this.setState({ titleInput: event.target.value })
	}

	onAddTransaction = (event) => {
		event.preventDefault();
		const { titleInput, amountInput, timestampInput, typeInput } = this.state;
		this.props.addTransaction(titleInput, amountInput, timestampInput, typeInput);
		this.reset();
	}

	render() {
		const { titleInput, amountInput, timestampInput, typeInput } = this.state;
		
		return(
			<section className="transaction-input">
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
						value={new Date(timestampInput).toISOString().substring(0, 10)}
						onChange={this.onChangeTimestampInput}
						max={new Date().toISOString().split("T")[0]}
						required
					/>
					<label htmlFor="select">
						TYPE
					</label>
					<select
						id="select"
						value={typeInput}
						onChange={this.onChangetypeInput}
					>
						{transactionTypeOptions.map((value, index) => (
							<option key={index} value={value}>
								{value}
							</option>
						))}
					</select>
					<button type="submit">
						Add
					</button>
				</form>
			</section>
		);
	}
}