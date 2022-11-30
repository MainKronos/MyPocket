// import './index.scss'

import { transactionTypeOptions } from '../utils'

import { Card, Col, Table, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export default function TransactionHistory (props) {
	const { transactionsList, deleteTransaction } = props;

	return (
		<Col span={14}>
			<Card title="History">
				<Table
					columns={[
						{
							title: "Title",
							dataIndex: "title",
							key: "title",
						},
						{
							title: "Amount",
							dataIndex: "amount",
							key: "amount",
							sorter: (a,b) => a.amount-b.amount,
						},
						{
							title: "Date",
							dataIndex: "date",
							key: "date",
						},
						{
							title: "Type",
							dataIndex: "type",
							key: "type",
							filters: transactionTypeOptions.map((value) =>{
								const tmp = {};
								tmp.value=value;
								tmp.text=value;
								return tmp;
							}),
							onFilter: (value, record) => record.type === value,
						},
						{
							title: "Action",
							key: "action",
							render: (_, record) => (
								<Button 
									type="primary" 
									icon={<DeleteOutlined />}
									onClick={()=>deleteTransaction(record.key)}
									danger
								/>
							)
						}
					]}
					dataSource={transactionsList.map((value) => {
						const {id, title, amount, timestamp, type} = value;
						const date = new Date(timestamp);
						const tmp = {};
						tmp.key=id;
						tmp.title=title;
						tmp.amount=amount;
						tmp.date=`${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
						tmp.type=type;
						tmp.action=null;
						return tmp;
					})}
				/>
			</Card>
		</Col>
	);
}