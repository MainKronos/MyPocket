import { Fragment } from 'react'

import './index.scss'
import balance from './img/balance-image.png';
import income from './img/income-image.png';
import expenses from './img/expenses-image.png';

export default function MoneyDetails(props) {
	const { balanceAmount, incomeAmount, expensesAmount } = props

	return (
		<Fragment>
			<article className="balance-container">
				<img
					src={balance}
					alt="balance"
				/>
				<div>
					<p>Your Balance</p>
					<data>
						€ {balanceAmount.toFixed(2)}
					</data>
				</div>
			</article>
			<article className="income-container">
				<img
					src={income}
					alt="income"
				/>
				<div>
					<p>Your Income</p>
					<data>
						€ {incomeAmount.toFixed(2)}
					</data>
				</div>
			</article>
			<article className="expenses-container">
				<img
					src={expenses}
					alt="expenses"
				/>
				<div>
					<p>Your Expenses</p>
					<data>
						€ {expensesAmount.toFixed(2)}
					</data>
				</div>
			</article>
		</Fragment>
	)
}
