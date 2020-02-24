import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import { StoreProvider } from './context';
import { OrderTable, OrderForm } from './components';

const App = () => {
  return (
    <div className="container">
      <StoreProvider>
        <OrderTable />
        <OrderForm />
      </StoreProvider>
    </div>
  );
}

export default App;
