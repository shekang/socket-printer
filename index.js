const puppeteer = require('puppeteer');
init()
async function init (){
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    await page.addScriptTag({
        path: `${process.cwd()}`+'/dist/printer.js',
        type: 'text/javascript'
    })
}