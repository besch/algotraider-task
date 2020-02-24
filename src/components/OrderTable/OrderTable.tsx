
import React from "react";
import { useObserver } from 'mobx-react-lite';
import { storeContext } from '../../context';

export const OrderTable: React.FC = () => {
  const store = React.useContext(storeContext)!;

  return (
    useObserver(() => (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Pair</th>
            <th scope="col">Side</th>
            <th scope="col">Order Type</th>
            <th scope="col">Limit</th>
            <th scope="col">Quantity</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            store.orders.get().map((order, i) => (
              <tr key={i} className="table-orders">
                <td>{order.pair}</td>
                <td>{order.side}</td>
                <td>{order.orderType}</td>
                <td>{order.limit}</td>
                <td>{order.quantity}</td>
                <td className="text-danger" onClick={() => store.removeOrder(i)}>remove</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    ))
  );
};
