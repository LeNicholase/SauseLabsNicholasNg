const {Builder, By, Key, until} = require('selenium-webdriver')
const protractor = require('protractor');
const utils = require('./utils')

//const SAUCE_USERNAME = process.env.SAUCE_USERNAME;
//const SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY;
const SAUCE_USERNAME = 'oauth-lenicholase-06062';
const SAUCE_ACCESS_KEY = 'cbdfaab9-e82f-43a3-89ad-3d89a01aff7b';
const ONDEMAND_URL = `https://${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.us-west-1.saucelabs.com:443/wd/hub`;
// NOTE: Use the URL below if using our EU datacenter (e.g. logged in to app.eu-central-1.saucelabs.com)
// const ONDEMAND_URL = `https://${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.eu-central-1.saucelabs.com:443/wd/hub`;


/**
* Run this test before working on the problem.
* When you view the results on your dashboard, you'll see that the test "Failed".
* Your job is to figure out why the test failed and make the changes necessary to make the test pass.
*
* Bonus: Once you get the test working, update the code so that when the test runs, it 
* can reach the Sauce Labs homepage 
* hover over 'Resources' and then clicks the 'Documentation' link
*/

describe('Broken Sauce', function () {
    it('should go to Google and click Sauce', async function () {

        try {
            let driver = await new Builder().withCapabilities(utils.brokenCapabilities)
                    .usingServer(ONDEMAND_URL).build();

        await driver.get("https://www.google.com");
        // If you see a German or English GDPR modal on google.com you 
        // will have to code around that or use the us-west-1 datacenter.
        // You can investigate the modal elements using a Live Test(https://app.saucelabs.com/live/web-testing)

		//amended search to q 
        let search = await driver.findElement(By.name("q"));
        await search.sendKeys("Sauce Labs");
        
        let button = await driver.findElement(By.name("btnK"))
        await button.click()

        let page = await driver.findElement(By.partialLinkText("saucelabs.com"));
		await page.click()
		
		//BONUS TASK
        // Find the 'Resources' element
        let resources = await driver.findElement(By.partialLinkText("Resources"));

        // Create a new instance of the Actions class
        let actions = driver.actions({bridge: true});

        // Move the mouse pointer over the 'Resources' element
        await actions.move({duration: 1000, origin: resources, x: 0, y: 0}).perform();

        // Find the 'Documentation' link
		let documentation = await driver.findElement(By.partialLinkText("Documentation"));
        // Click on the 'Documentation' link
        await documentation.click();
        
		await driver.quit();
        } catch (err) {
            // hack to make this pass for Gitlab CI
            // candidates can ignore this
            if (process.env.GITLAB_CI === 'true') {
                console.warn("Gitlab run detected.");
                console.warn("Skipping error in brokenSauce.js");
            } else {
                throw err;
            }
        }

    });
});
