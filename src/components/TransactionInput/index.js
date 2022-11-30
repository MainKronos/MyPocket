import { transactionTypeOptions } from '../utils'

// import './index.scss'
import dayjs from 'dayjs';
import { Form, Input, Select, InputNumber, DatePicker, Modal  } from 'antd';

export default function TransactionInput(props){

	const { addTransaction, closeModal, isModalOpen } = props

	const [form] = Form.useForm();

	// const { titleInput, amountInput, timestampInput, typeInput } = this.state;
	return(
		<Modal 
			title="Add Transaction"
			open={isModalOpen}
			okText="Add"
			cancelText="Cancel"
			onOk={() => {
				form.validateFields()
				.then((values) => {
					const { title, amount, date, type } = values;
					const timestamp = new Date(date).getTime();
					addTransaction(title, amount, timestamp, type);
					closeModal();
					form.resetFields();
				})
				.catch((info) => {
					console.log('Validate Failed:', info);
				});
			}}
			onCancel={() => {
				closeModal();
				form.resetFields();
			}}
		>
			<Form 
				form={form}
				initialValues={{
					title:'',
					amount:'',
					date:dayjs(),
					type:transactionTypeOptions[0]
				}}
				labelAlign="left"
				labelCol={{
					span:4
				}}
				
			>
				<Form.Item
					label="Title"
					name="title"
					rules={[{ required: true}]}
				>
					<Input
						allowClear
						placeholder="Title"
						style={{width:"100%"}}
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
						placeholder="Amount" 
						style={{width:"100%"}}
					/>
				</Form.Item>
				<Form.Item
					label="Date"
					name="date"
					rules={[{ required: true}]}
				>
					<DatePicker
						picker="date"
						disabledDate={(date) => date>=dayjs()}
						style={{width:"100%"}}
						placeholder="Date"
					/>
				</Form.Item>
				<Form.Item
					label="Type"
					name="type"
					rules={[{ required: true}]}
				>
					<Select
						style={{width:"100%"}}
						placeholder="Type"
						options={transactionTypeOptions.map((value) =>{
							const tmp = {};
							tmp.value=value;
							tmp.label=value;
							return tmp;
						})}
					/>
				</Form.Item>
			</Form>
		</Modal>
	);
}