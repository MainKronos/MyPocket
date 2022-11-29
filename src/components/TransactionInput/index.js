import { Component } from 'react'

import { transactionTypeOptions } from '../utils'

// import './index.scss'

import { Card, Col } from 'antd';
import { Form, Input, Button, Select, InputNumber, DatePicker } from 'antd';

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
	
	onChangetypeInput = (value) => {
		this.setState({ typeInput: transactionTypeOptions[value] })
	}

	onChangeAmountInput = (value) => {
		this.setState({ amountInput: value })
	}

	onChangeTimestampInput = (date, dateString) => {
		this.setState({ timestampInput: new Date(dateString).getTime() })
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
		// const { titleInput, amountInput, timestampInput, typeInput } = this.state;
		return(
			<Col span={10}>
				<Card title="Add Transaction">
					<Form 
						onFinish={this.onAddTransaction}
						// layout="vertical"
					>
						<Form.Item
							label="Title"
							name="title"
							required={true}
						>
							<Input
								onChange={this.onChangeTitleInput}
							/>
						</Form.Item>
						<Form.Item
							label="Amount"
							name="amount"
							required={true}
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
							required={true}
						>
							<DatePicker
								picker="date"
								onChange={this.onChangeTimestampInput}
								max={new Date().toISOString().split("T")[0]}
								// value={new Date(timestampInput).toISOString().substring(0, 10)}
							/>
						</Form.Item>
						<Form.Item
							label="Type"
							name="type"
							required={true}
						>
							<Select
								onChange={this.onChangetypeInput}
								options={transactionTypeOptions.map((value, index) =>{const tmp = {};tmp.value=index;tmp.label=value;return tmp;})}
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