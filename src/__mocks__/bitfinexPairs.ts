
import { IOrder } from '../stores';

export const getMockedExchangePairs = () => [
    {
        pair: "btcusd",
        price_precision: 5,
        initial_margin: "20.0",
        minimum_margin: "10.0",
        maximum_order_size: "2000.0",
        minimum_order_size: "0.0006",
        expiration: "NA",
        margin: true
    }, {
        pair: "ltcusd",
        price_precision: 5,
        initial_margin: "30.0",
        minimum_margin: "15.0",
        maximum_order_size: "5000.0",
        minimum_order_size: "0.1",
        expiration: "NA",
        margin: true
    }, {
        pair: "ltcbtc",
        price_precision: 5,
        initial_margin: "30.0",
        minimum_margin: "15.0",
        maximum_order_size: "5000.0",
        minimum_order_size: "0.1",
        expiration: "NA",
        margin: true
    },
];

export const sampleOrder: IOrder = {
    key: 123,
    pair: 'btsusd',
    side: 'buy',
    orderType: 'LIMIT',
    limit: 11,
    quantity: 32
};