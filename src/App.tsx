import React from 'react';
import 'antd/dist/antd.css';
import './App.css';

import { StoreProvider } from './context';
import { OrderTable, OrderForm } from './components';

const App = () => {
  return (
    <StoreProvider>
      <OrderTable />
      <OrderForm />
    </StoreProvider>
  );
}

export default App;
