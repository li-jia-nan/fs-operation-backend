import fs from 'fs';
import cors from 'cors';
import express, { json } from 'express';
import { AddressInfo } from 'net';
import { deserializer, join, serializer } from './utils';
import { ErrorModel, SuccessModel } from './model';

const app = express();

app.use(cors());
app.use(json());

app.get('/read', (req, res) => {
  const { path } = req.query;
  if (!path) {
    res.status(500).send(new ErrorModel(null, '读取失败，请传入正确的path'));
    return;
  }
  const buffer = fs.readFileSync(join(path as string));
  res.send(new SuccessModel(deserializer(buffer.toString()), '读取成功'));
});

app.post('/create', (req, res) => {
  const { path, content } = req.body;
  if (!path || !content) {
    res.status(500).send(new ErrorModel(null, '写入失败，请传入正确的参数'));
    return;
  }
  fs.writeFileSync(join(path), serializer(content));
  res.send(new SuccessModel(null, '写入成功'));
});

const server = app.listen(8080, () => {
  const { port } = server.address() as AddressInfo;
  console.log('访问端口为：', port);
});
