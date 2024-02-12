const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const createPullRequest = async () => {
    const token = 'YOUR_GITHUB_TOKEN'; // Replace with your GitHub personal access token
    const owner = 'REPO_OWNER'; // Replace with the repository owner's username
    const repo = 'REPO_NAME'; // Replace with the repository name
    const title = 'Pull Request Title'; // The title of the pull request
    const head = 'feature-branch'; // The name of your branch with changes
    const base = 'main'; // The name of the branch you want to merge your changes into
    const body = 'Description of the pull request'; // The body of the pull request

    const url = `https://api.github.com/repos/${owner}/${repo}/pulls`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                head,
                base,
                body
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Pull request created:', data.html_url);
        } else {
            console.error('Failed to create pull request:', data);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
function extractUrlsFromHtml(htmlString) {
    // Use the DOMParser to parse the HTML string
    const doc = new JSDOM(htmlString).window.document;

    console.log(doc)
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

        const xcxUrl = urls.find(el => el.includes('sydney'));


        if(xcxUrl){
            console.log(xcxUrl); // Process the received data

        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();