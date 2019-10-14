const next = require('next');
const express = require('express');
const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.get('/', (req, res) => {
    app.render(req, res, '/homepage');
  });
  server.get('/:nodeTitle', (req, res) => {
    const queryParams = { slug: req.params.nodeTitle };
    console.log(queryParams);
    app.render(req, res, '/page', queryParams);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });
  server.listen(port, err => {
    if (err) {
      throw err;
    }
    console.log('server started at' + port);
  });
});