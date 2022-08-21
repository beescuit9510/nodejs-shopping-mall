const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html><head><title>Enter Message</title></head>');
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message" /><button type="submit">Submit</button></form></body>'
    );
    res.write('</html>');
    res.end();
    return;
  }
  if (url === '/message' && method === 'POST') {
    // event-driven
    // defining a function that's going to be excuted
    // for every incoming data piece
    const body = [];
    req.on('data', (chuck) => {
      console.log(chuck);
      body.push(chuck);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, (error) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
        return;
      });
    });
  }
  // res.setHeader('Content-Type', 'text/html');
  // res.write('<html><head><title>Hello World</title></head>');
  // res.write('<body><h1>Hello World</h1></body>');
  // res.write('</html>');
  // res.end();
  // return;
};

// module.exports = requestHandler;
// module.exports.handler = requestHandler;

//explicit shortcut provided by node.js
module.exports = { handler: requestHandler };
