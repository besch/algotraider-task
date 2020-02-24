const puppeteer = require("puppeteer");
const delay = (time: number) => {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 };

it("order should have limit provided if order type is LIMIT", async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        args: ['--window-size-1920,1080']
    });

    const page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await delay(3000); // wait for bitfinex pairs to load
    await page.select('#pair-field', 'btcusd');
    await page.select('#side-field', 'buy');
    await page.select('#order-field', 'LIMIT');
    await page.type('#limit-field', '9');
    await page.type('#quantity-field', '13');
    await page.click('#submit-order');

    const addedOrder = await page.$eval('.table-orders', el => el.textContent);
    expect(addedOrder).toMatch(/btcusdbuyLIMIT913/);
}, 10000);

it("order should have limit provided if order type is LIMIT", async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        args: ['--window-size-1920,1080']
    });

    const page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await delay(3000); // wait for bitfinex pairs to load
    await page.select('#pair-field', 'btcusd');
    await page.select('#side-field', 'buy');
    await page.select('#order-field', 'LIMIT');
    await page.type('#limit-field', '');
    await page.type('#quantity-field', '13');
    await page.click('#submit-order');

    let el;
    await page.evaluate(() => {
        el = document.querySelector('.table-orders');
    });
    expect(el).toBeUndefined();

    await browser.close();
}, 10000);
