
import React, { useState, useEffect } from "react";
import { FormComponentProps } from 'antd/lib/form/Form';
import { Form, InputNumber, Button, Select } from 'antd';
import { storeContext } from '../../context';
import { useObserver } from 'mobx-react-lite';
import { bitfinexPairs } from '../../services';

const { Option } = Select;

const hasErrors = (fieldsError: any) => Object.keys(fieldsError).some(field => fieldsError[field]);

const OrderForm: React.FC<FormComponentProps> = (props) => {
  const store = React.useContext(storeContext)!;
  const { form } = props;
  const { getFieldDecorator, getFieldsError } = props.form;
  const [orderType, setOrderType] = useState<string>('');
  const [pairs, setPairs] = useState<string[]>([]);

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  useEffect(() => {
    bitfinexPairs()
      .then((data: string[]) => setPairs(data));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      form.validateFields((err, values) => {
          if (!err) {
              store.addOrder(values);
              form.resetFields();
          }
      });
  };

  const pairField = () => (
      <Form.Item label="Pair" hasFeedback>
        {getFieldDecorator('pair', {
          rules: [{ 
              required: true, 
              message: 'Please select pairs!'
          }],
        })(
          <Select loading={!pairs.length}>
              {
                pairs.map(pair => (
                  <Option key={pair} value={pair}>{pair}</Option>
                ))
              }
          </Select>
        )}
      </Form.Item>
  );

  const sideField = () => (
      <Form.Item label="Side" hasFeedback>
        {getFieldDecorator('side', {
          rules: [{ 
              required: true, 
              message: 'Please select action!' 
          }],
        })(
          <Select>
              <Option value="buy">Buy</Option>
              <Option value="sell">Sell</Option>
          </Select>
        )}
      </Form.Item>
  );

  const orderTypeField = () => (
      <Form.Item label="Order type" hasFeedback>
        {getFieldDecorator('orderType', {
          initialValue: 'MARKET',
          rules: [{ 
              required: true,
              message: 'Please select order type!' 
          }],
        })(
          <Select onChange={(e: any) => setOrderType(e)}>
              <Option value="MARKET">MARKET</Option>
              <Option value="LIMIT">LIMIT</Option>
          </Select>
        )}
      </Form.Item>
  );

  const limitField = () => (
      <Form.Item label="Limit" hasFeedback>
        {getFieldDecorator('limit', {
          rules: [{ 
              required: orderType === 'LIMIT', 
              message: 'Please provide limit' 
          }],
        })(
          <InputNumber />
        )}
      </Form.Item>
  );

  const quantityField = () => (
      <Form.Item label="Quantity" hasFeedback>
        {getFieldDecorator('quantity', {
          rules: [{ 
              required: true, 
              message: 'Please provide limit' 
          }],
        })(
          <InputNumber />
        )}
      </Form.Item>
  );

  return (
    useObserver(() => (
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        {pairField()}
        {sideField()}
        {orderTypeField()}
        {limitField()}
        {quantityField()}
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            Place order
          </Button>
        </Form.Item>
      </Form>
    ))
  );
};

export const OrderFormWrapper = Form.create({ name: 'orderForm' })(OrderForm);