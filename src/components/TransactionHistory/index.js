import './index.scss'

export default function TransactionHistory (props) {
	const { transactionsList, deleteTransaction } = props;

	return (
		<section className="transaction-history">
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
					{transactionsList.map(elem => (
						<TransactionItem
							key = {elem.id}
							title = {elem.title}
							amount = {elem.amount}
							timestamp = {elem.timestamp}
							type = {elem.type}
							onDeleteTransaction = {()=>deleteTransaction(elem.id)}
						/>
					))}
				</tbody>
			</table>
		</section>
	);
}

function TransactionItem(props){

	const {title, amount, timestamp, type, onDeleteTransaction} = props;
	const date = new Date(timestamp);

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
	);
}