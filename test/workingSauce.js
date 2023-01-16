const {Builder, By, Key, until} = require('selenium-webdriver')
const SauceLabs = require('saucelabs').default;
const assert = require('assert');
const utils = require('./utils')


const SAUCE_USERNAME = 'oauth-lenicholase-06062';
const SAUCE_ACCESS_KEY = 'cbdfaab9-e82f-43a3-89ad-3d89a01aff7b';
let USERNAME = 'oauth-lenicholase-06062';
let ACCESS_KEY = 'cbdfaab9-e82f-43a3-89ad-3d89a01aff7b';
const ONDEMAND_URL = `https://${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.saucelabs.com:443/wd/hub`;
// NOTE: Use the URL below if using our EU datacenter (e.g. logged in to app.eu-central-1.saucelabs.com)
// const ONDEMAND_URL = `https://${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.eu-central-1.saucelabs.com:443/wd/hub`;
const sauce = new SauceLabs({
    username: "oauth-lenicholase-06062",
    password: "cbdfaab9-e82f-43a3-89ad-3d89a01aff7b"
});

/**
* Task I: Update the test code so when it runs, the test clicks the "I am a link" link.
*
* Task II - Comment out the code from Task I. Update the test code so when it runs, 
* the test is able to write "Sauce" in the text box that currently says "I has no focus".
*
* Task III - Update the test code so when it runs, it adds an email to the email field, 
* adds text to the comments field, and clicks the "Send" button.
* Note that email will not actually be sent!
*
* Task IV - Add a capability that adds a tag to each test that is run.
* See this page for instructions: https://docs.saucelabs.com/dev/test-configuration-options/
* 
* Bonus: Set the status of the test so it shows as "passed" instead of "complete".
* We've included the node-saucelabs package already. For more info see:
* https://github.com/saucelabs/node-saucelabs
*/

describe('Working Sauce', function () {
    it('should go to Google and click Sauce', async function () {
        let driver = await new Builder().withCapabilities(utils.workingCapabilities)
                    .usingServer(ONDEMAND_URL).build();


    /**
     * Goes to Sauce Lab's guinea-pig page and verifies the title
     */

    await driver.get("https://saucelabs.com/test/guinea-pig");
    await assert.strictEqual("I am a page title - Sauce Labs", await driver.getTitle());

    // Task I
	// Select the link element by id
	//var link = driver.findElement(By.id('i am a link'));
	// Simulate a mouse click on the link
	//link.click();


    // Task II
	// Find the textbox element by its id
	//const textbox = await driver.findElement(By.id("i_am_a_textbox"));

	// Clear the current value of the textbox
	//await textbox.clear();

	// Replace the value of the textbox with "Sauce"
	//await textbox.sendKeys("Sauce");


    // Task III
	const emailbox = await driver.findElement(By.id("fbemail"));
	const comments = await driver.findElement(By.id("comments"));

	// Replace the value of the textbox with "Sauce"
	await emailbox.sendKeys("get_hired@sauselabs.com");
	await comments.sendKeys("Let's Go! Nicholas Ng here");
	// Find the button element by its id
	const button = await driver.findElement(By.id("submit"));

	// Click the button
	await button.click();
	
	//Bonus Task
/* 	sauce.updateJob(driver.sessionId, {
		passed: true
	}, function(err) {
		console.log(err);
	});
 */

    await driver.quit();
    });
	

});

