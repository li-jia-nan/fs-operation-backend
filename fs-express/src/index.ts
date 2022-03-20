import cors from 'cors';
import express, { json } from 'express';
import { AddressInfo } from 'net';
import { createRouter, readRouter } from './router';

const app = express();

app.use(cors());
app.use(json());

app.get('/read', (req, res) => {
  readRouter(req)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.post('/create', (req, res) => {
  createRouter(req)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

const server = app.listen(8080, () => {
  const { port } = server.address() as AddressInfo;
  console.log('访问端口为：', port);
});
