// import './index.scss'

import { transactionTypeOptions } from '../utils'

import { Card, Col, Table, Button,  message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export default function TransactionHistory (props) {
	const { transactionsList, deleteTransaction } = props;

	return (
		<Col span={24}>
			<Card title="History">
				<Table
					size={"small"}
					pagination={false}
					// pagination={{
					// 	position:"bottomCenter",
					// 	showTotal:(total) => `Total ${total} items`,
					// 	defaultPageSize:5,
					// 	// defaultCurrent:1,
					// }}
					expandable={{
						expandedRowRender: (record, index, indent, expanded) => (
							<Button 
								// type="dashed" 
								icon={<DeleteOutlined />}
								onClick={()=>{
									deleteTransaction(record.key);
									message.success(`Record deleted.`)
								}}
								style={{
									width: '100%',
								}}
								danger
							/>
						)
					}}
					scroll={{
						scrollToFirstRowOnChange:true,
						y:300
					}}
					columns={[
						{
							title: "Title",
							dataIndex: "title",
							key: "title",
							align:"center",
							ellipsis:true,
							width:"10rem"
						},
						{
							title: "Amount",
							dataIndex: "amount",
							key: "amount",
							sorter: (a,b) => a.amount-b.amount,
							align:"center",
							width:90
						},
						{
							title: "Date",
							dataIndex: "date",
							key: "date",
							align:"center",
							width:110
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
							align:"center",
							width:100,
							responsive: ['md']
						}
					]}
					dataSource={transactionsList.map((value) => {
						const {id, title, amount, timestamp, type} = value;
						const date = new Date(timestamp);
						const tmp = {};
						tmp.key=id;
						tmp.title=title;
						tmp.amount=parseFloat(amount).toFixed(2) + " €";
						tmp.date=`${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
						tmp.type=type;
						return tmp;
					})}
				/>
			</Card>
		</Col>
	);
}