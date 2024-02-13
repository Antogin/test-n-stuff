const jsdom = require("jsdom");
const simpleGit = require('simple-git');
const git = simpleGit();
const fs = require('fs');
const path = require('path');
const { JSDOM } = jsdom;

const sleep = ms => new Promise(r => setTimeout(r, ms));

function appendFile(txt) {
    const filePath = path.join(__dirname, 'README.md');

    // Define the string you want to append
    const appendString = `\n## New URL : ${txt}`;
    
    // Use fs.appendFile to append the string to the file
    fs.appendFileSync(filePath, appendString, (err) => {
        if (err) {
            console.error('Failed to append to file:', err);
        } else {
            console.log('Content appended successfully.');
        }
    });
}

async function commitAndPushChanges(branchName, commitMessage) {
    try {
        // Check current status to ensure the working directory is clean
        const status = await git.status();
        if (status.files.length === 0) {
            console.log('No changes to commit.');
            return;
        }

        // Checkout a new branch
        await git.checkoutLocalBranch(branchName);

        // Add all changes to staging
        await git.add('.');

        // Commit changes
        await git.commit(commitMessage);

        // Push changes to remote
        await git.push('origin', branchName);

        console.log('Changes committed and pushed to branch:', branchName);
    } catch (error) {
        console.error('Failed to commit and push changes:', error);
    }
}

function extractUrlsFromHtml(htmlString) {
    // Use the DOMParser to parse the HTML string
    const doc = new JSDOM(htmlString).window.document;
    // Query all <a> elements in the parsed document
    const links = doc.querySelectorAll('a');

    // Extract the href attributes from each <a> element
    const urls = Array.from(links).map(link => link.href);

    return urls;
}

(async () => {
    // Your asynchronous code goes here
    try {
        // Example of an async operation, like fetching data from an API
        const response = await fetch('https://boilerroom.tv/upcoming');
        const data = await response.text();
        const urls = extractUrlsFromHtml(data)
        // console.log(data); // Process the received data

        // console.log(urls); // Process the received data

        const xcxUrl = urls.find(el => el.includes('xcx'));


        if(xcxUrl){
            console.log(xcxUrl); // Process the received data

            const splitted = xcxUrl.split('/');

            const last = splitted[splitted.length - 1]
            console.log(last); // Process the received data

            appendFile(xcxUrl);

            await sleep(2000);

            commitAndPushChanges(last, xcxUrl)
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();