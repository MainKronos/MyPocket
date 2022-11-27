import { Component } from 'react'

import './index.scss'

export default class TransactionHistory extends Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	value: null,
		// };
	}
	render() {
		const { transactionDetails, deleteTransaction } = this.props
		const { id, title, amount, date, type } = transactionDetails

		const onDeleteTransaction = () => {
			deleteTransaction(id)
		}

		return (
			<tr>
				<td>{title}</td>
				<td>€ {amount.toFixed(2)}</td>
				<td>{`${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`}</td>
				<td>{type}</td>
				<td>
					<button
						className="delete-button"
						type="button"
						onClick={onDeleteTransaction}
						testid="delete"
					>
						<img
							className="delete-img"
							src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
							alt="delete"
						/>
					</button>
				</td>
			</tr>
		)
	}
}
