// import './index.scss'

import { Card, Col, Table, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export default function TransactionHistory (props) {
	const { transactionsList, deleteTransaction } = props;

	return (
		<Col span={14}>
			<Card title="History">
				<Table
					columns={[...["Title","Amount","Date","Type"].map((value) => {
						const tmp = {};
						tmp.title=value;
						tmp.dataIndex=value.toLowerCase();
						tmp.key=value.toLowerCase();
						return tmp;
					}),{
						title: "Action",
						key: "action",
						render: (_, record) => (
							// <a>Delete</a>
								
							
							<Button 
								type="primary" 
								icon={<DeleteOutlined />}
								onClick={()=>deleteTransaction(record.key)}
								danger
							/>
						)
					}]}
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