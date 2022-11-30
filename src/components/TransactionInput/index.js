import { Component } from 'react'

import { transactionTypeOptions } from '../utils'

// import './index.scss'
import dayjs from 'dayjs';
import { Card, Col } from 'antd';
import { Form, Input, Button, Select, InputNumber, DatePicker } from 'antd';

export default class TransactionInput extends Component{
	constructor(props) {
		super(props);
		
	}

	onAddTransaction = (values) => {
		// event.preventDefault();
		const { title, amount, date, type } = values;
		const timestamp = new Date(date).getTime();
		const typeOption = transactionTypeOptions[type];
		this.props.addTransaction(title, amount, timestamp, typeOption);
	}

	render() {
		// const { titleInput, amountInput, timestampInput, typeInput } = this.state;
		return(
			<Col span={10}>
				<Card title="Add Transaction">
					<Form 
						onFinish={this.onAddTransaction}
						preserve={false}
						initialValues={{
							title:'',
							amount:'',
							date:dayjs(),
							type:transactionTypeOptions[0]
						}}
						// layout="vertical"
					>
						<Form.Item
							label="Title"
							name="title"
							rules={[{ required: true}]}
						>
							<Input
								
							/>
						</Form.Item>
						<Form.Item
							label="Amount"
							name="amount"
							rules={[{ required: true}]}
						>
							<InputNumber 
								addonAfter="€"
								min="0.01"
								step="0.01"

							/>
						</Form.Item>
						<Form.Item
							label="Date"
							name="date"
							rules={[{ required: true}]}
						>
							<DatePicker
								picker="date"

								max={new Date().toISOString().split("T")[0]}
								// value={new Date(timestampInput).toISOString().substring(0, 10)}
							/>
						</Form.Item>
						<Form.Item
							label="Type"
							name="type"
							rules={[{ required: true}]}
						>
							<Select

								options={transactionTypeOptions.map((value) =>{
									const tmp = {};
									tmp.value=value;
									tmp.label=value;
									return tmp;
								})}
							/>
						</Form.Item>
						
						<Button type="primary" htmlType="submit">
							Add
						</Button>
					</Form>
				</Card>
			</Col>
		);
	}
}