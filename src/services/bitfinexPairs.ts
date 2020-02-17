
export const getBitfinexPairs = () => {
    const url = 'https://api.bitfinex.com/v1/symbols_details';
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    
    return fetch(proxyUrl + url)
        .then(response => response.json())
        .then(text => text.map((t: any) => t.pair));
};

