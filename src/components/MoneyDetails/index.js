import { Fragment } from 'react'

import { Card, Col, Row, Statistic } from 'antd';

export default function MoneyDetails(props) {
	const { balanceAmount, incomeAmount, expensesAmount } = props

	return (
		<Fragment>
			<Col span={8}>
				<Card>
					<Statistic
						title="Balance"
						value={balanceAmount}
						precision={2}
						prefix="€"
					/>
				</Card>
			</Col>
			<Col span={8}>
				<Card>
						<Statistic
						title="Income"
						value={incomeAmount}
						precision={2}
						prefix="€"
					/>
				</Card>
			</Col>
			<Col span={8}>
				<Card>
					<Statistic
						title="Expenses"
						value={expensesAmount}
						precision={2}
						prefix="€"
					/>
				</Card>
			</Col>
		</Fragment>
	)
}
