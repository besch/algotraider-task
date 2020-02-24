import { observable } from "mobx";
import { toLocalStorage, fromLocalStorage } from '../services';

export interface IOrder {
  key?: number;
  pair: string;
  side: string;
  orderType: string;
  limit?: number;
  quantity: number;
}

const Orders: IOrder[] = [];

export const createStore = () => {
  const store = {
    orders: observable.box<IOrder[]>(fromLocalStorage() || Orders),

    saveOrders(orders: IOrder[]) {
      toLocalStorage(orders);
    },

    addOrder(order: IOrder) {
      store.orders.set([...store.orders.get(), order])
      toLocalStorage(store.orders);
    },

    removeOrder(index: number) {
      const newState = [...store.orders.get()];
      newState.splice(index, 1);

      store.orders.set(newState);
      toLocalStorage(newState);
    },
  };

  return store;
};

export type TStore = ReturnType<typeof createStore>