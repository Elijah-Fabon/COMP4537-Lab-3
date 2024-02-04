const http = require('http');
const url = require('url');
const utils = require('../modules/utils.js');
const messages = require('../lang/messages/en/user.js');
const queryString = require('querystring');

const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url);
    const queryParams = queryString.parse(reqUrl.query);

    if (reqUrl.pathname === '/COMP4537/labs/3/getDate/' && req.method === 'GET' && queryParams.name) {
        // Set response headers for HTML content
        res.writeHead(200, { 'Content-Type': 'text/html' });

        // Get current server time
        const userName = queryParams.name;
        const currentDate = utils.getDate();

        // Create the response message with inline styling for blue color
        const greetingMessage = messages.userMessages.greeting.replace('%1', userName);
        const responseMessage = `<div style="color:blue">${greetingMessage} ${currentDate}</div>`;

        // Send the response
        res.end(responseMessage);
    } else {
        // For invalid requests, return a 404 error
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

// Define the port to listen on
const PORT = process.env.PORT || 3000;

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});