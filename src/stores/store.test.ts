import { createStore as createOrderStore } from './store';
import { fromLocalStorage, clearLocalStorage } from '../services'
import { sampleOrder } from '../__mocks__';

describe("OrderStore", () => {
  beforeEach(() => clearLocalStorage());

  it("creates adds new order and saves it to localStorage state", () => {
    const store = createOrderStore();
    store.addOrder(sampleOrder);
    expect(store.orders.get().length).toBe(1);
    expect(store.orders.get()[0]).toStrictEqual(sampleOrder);
    expect(fromLocalStorage().length).toBe(1);
    expect(fromLocalStorage()[0]).toStrictEqual(sampleOrder);
  });

  it("removes order and deletes it from localStorage state", () => {
    const store = createOrderStore();
    store.addOrder(sampleOrder);
    store.removeOrder(0);
    expect(store.orders.get().length).toBe(0);
    expect(fromLocalStorage().length).toBe(0);
  });
});
