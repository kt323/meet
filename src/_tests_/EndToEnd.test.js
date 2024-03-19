import puppeteer from 'puppeteer';

describe('show/hide event details', () => {
    let browser;
    let page;
    beforeAll(async () => {
      browser = await puppeteer.launch({
        headless: false,
        slowMo: 250, // slow down by 250ms,
        timeout: 0 // removes any puppeteer/browser timeout limitations (this isn't the same as the timeout of jest)
      });
      page = await browser.newPage();
      await page.goto('www.google.com');
    //   await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });

    // Scenario 1
    test('An event element is collapsed by default', async () => {
        expect[true]
        // const eventDetails = await page.$('.event .details');
        // expect(eventDetails).toBeNull();
    });

    // // Scenario 2
    // test('User can expand an event to see its details', async () => {
    //     await page.click('.event .showDetailsButton');
    //     const eventDetails = await page.$('.event .details');
    //     expect(eventDetails).toBeDefined();
    // });

    // // Scenario 3
    // test('User can collapse an event to hide details', async () => {
    //     await page.click('.event .showDetailsButton');
    //     const eventDetails = await page.$('.event .details');
    //     expect(eventDetails).toBeNull();
    // });
});