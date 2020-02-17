import React from 'react';
import 'antd/dist/antd.css';
import './App.css';

import { StoreProvider } from './context';
import { OrderTable, OrderFormWrapper } from './components';

const App = () => {
  return (
    <StoreProvider>
      <OrderTable />
      <OrderFormWrapper />
    </StoreProvider>
  );
}

export default App;
