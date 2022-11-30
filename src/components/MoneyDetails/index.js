import { Fragment } from 'react'

import { Card, Col, Statistic } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, BankOutlined } from '@ant-design/icons';

export default function MoneyDetails(props) {
	const { balanceAmount, incomeAmount, expensesAmount } = props

	return (
		<Fragment>
			<Col xl={8} lg={8} md={8} sm={24} xs={24}>
				<Card>
					<Statistic
						title="Balance"
						value={balanceAmount}
						precision={2}
						suffix="€"
						valueStyle={{ color: '#4169e1' }}
						prefix={<BankOutlined />}
					/>
				</Card>
			</Col>
			<Col xl={8} lg={8} md={8} sm={12} xs={24}>
				<Card>
						<Statistic
						title="Income"
						value={incomeAmount}
						precision={2}
						suffix="€"
						valueStyle={{ color: '#3f8600' }}
						prefix={<ArrowUpOutlined />}
					/>
				</Card>
			</Col>
			<Col xl={8} lg={8} md={8} sm={12} xs={24}>
				<Card>
					<Statistic
						title="Expenses"
						value={expensesAmount}
						precision={2}
						suffix="€"
						valueStyle={{ color: '#cf1322' }}
            			prefix={<ArrowDownOutlined />}
					/>
				</Card>
			</Col>
		</Fragment>
	)
}
