import { Component } from 'react'

import { transactionTypeOptions } from '../utils'

// import './index.scss'

import { Button, Checkbox, Form, Input, Card, Col, InputNumber, DatePicker } from 'antd';

export default class TransactionInput extends Component{
	constructor(props) {
		super(props);
		this.state = {
			titleInput: '',
			amountInput: '',
			timestampInput: new Date().setUTCHours(0, 0, 0, 0),
			typeInput: transactionTypeOptions[0],
		};
	}

	reset = () => {
		this.setState({
			titleInput: '',
			amountInput: '',
			timestampInput: new Date().setUTCHours(0, 0, 0, 0),
			typeInput: transactionTypeOptions[0],
		})
	}
	
	onChangetypeInput = (event) => {
		this.setState({ typeInput: event.target.value })
	}

	onChangeAmountInput = (event) => {
		this.setState({ amountInput: parseFloat(event.target.value) })
	}

	onChangeTimestampInput = (event) => {
		this.setState({ timestampInput: new Date(event.target.value).getTime() })
	}

	onChangeTitleInput = (event) => {
		this.setState({ titleInput: event.target.value })
	}

	onAddTransaction = (event) => {
		// event.preventDefault();
		const { titleInput, amountInput, timestampInput, typeInput } = this.state;
		this.props.addTransaction(titleInput, amountInput, timestampInput, typeInput);
		this.reset();
	}

	render() {
		const { titleInput, amountInput, timestampInput, typeInput } = this.state;
		
		return(
			<Col span={24}>
				<Card title="Add Transaction">
					<Form onFinish={this.onAddTransaction}>
						<Form.Item
							label="Title"
							name="title"
							rules={[{ required: true }]}
						>
							<Input
								onChange={this.onChangeTitleInput}
							/>
						</Form.Item>
						<Form.Item
							label="Amount"
							name="amount"
							rules={[{ required: true }]}
						>
							<InputNumber 
								addonAfter="€"
								min="0.01"
								step="0.01"
								onChange={this.onChangeAmountInput}
							/>
						</Form.Item>
						<Form.Item
							label="Date"
							name="date"
							rules={[{ required: true }]}
						>
							<DatePicker
								picker="date"
								onChange={this.onChangeTimestampInput}
								max={new Date().toISOString().split("T")[0]}
								// value={new Date(timestampInput).toISOString().substring(0, 10)}
							/>
						</Form.Item>
						<label htmlFor="select">
							TYPE
						</label>
						<select
							id="select"
							value={typeInput}
							onChange={this.onChangetypeInput}
						>
							{transactionTypeOptions.map((value, index) => (
								<option key={index} value={value}>
									{value}
								</option>
							))}
						</select>
						<button type="submit">
							Add
						</button>
					</Form>
				</Card>
			</Col>
		);
	}
}