
import React, { useState, useEffect } from "react";
import { storeContext } from '../../context';
import { useObserver } from 'mobx-react-lite';
import { getBitfinexPairs } from '../../services';
import { IOrder } from '../../stores';

const getEmptyOrder = () => ({
  pair: '',
  side: '',
  orderType: '',
  limit: undefined,
  quantity: undefined
})

export const OrderForm: React.FC = () => {
  const store = React.useContext(storeContext)!;
  const [orderState, setOrderState] = useState<any>(getEmptyOrder());
  const [pairs, setPairs] = useState<string[]>([]);
  const [formValidationFeedback, setFormValidationFeedback] = useState<string>('');

  useEffect(() => {
    getBitfinexPairs()
      .then(data => setPairs(data));
  }, []);

  const onFieldChange = (e: any, fieldName: keyof IOrder) => {
    setOrderState({ ...orderState, [fieldName]: e.target.value });
  }

  const handleSubmit = (e: React.FormEvent) => {
    if (orderState.pair && orderState.side && orderState.orderType && orderState.quantity) {
      if (orderState.orderType === 'LIMIT' && !orderState.limit) {
        return setFormValidationFeedback('When order type is LIMIT, limit field should have positive value');
      }

      store.addOrder(orderState);
      setOrderState(getEmptyOrder());
      setFormValidationFeedback('')
    } else {
      setFormValidationFeedback('There are errors in order form, please provide required fields');
    }
  };

  const pairField = () => (
    <div className="form-group">
      <label htmlFor="pair-field">
        <span className="text-danger">*</span>
        Pair
      </label>
      <select 
        required 
        className="form-control" 
        id="pair-field" 
        value={orderState.pair}
        defaultValue=""
        onChange={e => onFieldChange(e, 'pair')}>
          <option value="">Select value</option>
          {
            pairs.map(pair => (
              <option key={pair} value={pair}>{pair}</option>
            ))
          }
      </select>
    </div>
  );

  const sideField = () => (
    <div className="form-group">
      <label htmlFor="side-field">
        <span className="text-danger">*</span>
        Side
      </label>
      <select 
        required 
        className="form-control" 
        defaultValue=""
        id="side-field" 
        value={orderState.side} 
        onChange={e => onFieldChange(e, 'side')}>
          <option value="">Select value</option>
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
      </select>
    </div>
  );

  const orderTypeField = () => (
    <div className="form-group">
      <label htmlFor="order-field">
        <span className="text-danger">*</span>
        Order
      </label>
      <select 
        required 
        className="form-control" 
        defaultValue=""
        id="order-field" 
        value={orderState.orderType} 
        onChange={e => onFieldChange(e, 'orderType')}>
          <option value="">Select value</option>
          <option value="MARKET">MARKET</option>
          <option value="LIMIT">LIMIT</option>
      </select>
    </div>
  );

  const limitField = () => (
    <div className="form-group">
      <label htmlFor="limit-field">
        {orderState.orderType === 'LIMIT' && <span className="text-danger">*</span>}
        Limit
      </label>
      <input 
        type="number" 
        className="form-control" 
        id="limit-field" 
        min={0}
        required={orderState.orderType === 'LIMIT'}
        value={orderState.limit} 
        onChange={e => onFieldChange(e, 'limit')}
      />
    </div>
  );

  const quantityField = () => (
    <div className="form-group">
      <label htmlFor="quantity-field">
        <span className="text-danger">*</span>
        Quantity
      </label>
      <input 
        type="number"
        className="form-control"
        id="quantity-field"
        min={0} 
        required 
        value={orderState.quantity} 
        onChange={e => onFieldChange(e, 'quantity')}
      />
    </div>
  );

  return (
    useObserver(() => (
      <div className="form-group">
        {pairField()}
        {sideField()}
        {orderTypeField()}
        {limitField()}
        {quantityField()}

        {formValidationFeedback && (
          <div className="alert alert-danger" role="alert">
            {formValidationFeedback}
          </div>
        )}

        <button className="btn btn-success" onClick={handleSubmit} id="submit-order">
          Place order
        </button>
      </div>
    ))
  );
};