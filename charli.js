const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function extractUrlsFromHtml(htmlString) {
    // Use the DOMParser to parse the HTML string
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

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

        console.log(urls); // Process the received data

    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();