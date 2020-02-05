
import React from "react";
import { Table, Icon } from 'antd';
import { useObserver } from 'mobx-react-lite';
import { storeContext } from '../../context';

export const OrderTable: React.FC = () => {
  const store = React.useContext(storeContext)!;
  const columns = [
    {
      title: 'Pair',
      dataIndex: 'pair',
      key: 'pair',
    },
    {
      title: 'Side',
      dataIndex: 'side',
      key: 'side',
    },
    {
      title: 'Order Type',
      dataIndex: 'orderType',
      key: 'orderType',
    },
    {
      title: 'Limit',
      dataIndex: 'limit',
      key: 'limit',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Action',
      key: 'action',
      render: (el: any, b: any, index: number) =>
        <Icon onClick={() => store.removeOrder(index)} type="delete" />,
    },
  ];

  return (
    useObserver(() => (
      <Table 
        columns={columns} 
        dataSource={store.orders.get()}
      />
    ))
  );
};
