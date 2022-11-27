import './index.css'
import balance from './img/balance-image.png';
import income from './img/income-image.png';
import expenses from './img/expenses-image.png';

export default function MoneyDetails(props) {
	const { balanceAmount, incomeAmount, expensesAmount } = props

	return (
		<div className="money-details-container">
			<div className="balance-container">
				<img
					src={balance}
					alt="balance"
					className="details-img"
				/>
				<div>
					<p className="details-text">Your Balance</p>
					<p className="details-money">
						€ {balanceAmount.toFixed(2)}
					</p>
				</div>
			</div>
			<div className="income-container">
				<img
					src={income}
					alt="income"
					className="details-img"
				/>
				<div>
					<p className="details-text">Your Income</p>
					<p className="details-money">
						€ {incomeAmount.toFixed(2)}
					</p>
				</div>
			</div>
			<div className="expenses-container">
				<img
					src={expenses}
					alt="expenses"
					className="details-img"
				/>
				<div>
					<p className="details-text">Your Expenses</p>
					<p className="details-money">
						€ {expensesAmount.toFixed(2)}
					</p>
				</div>
			</div>
		</div>
	)
}
