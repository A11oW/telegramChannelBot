/* eslint-env node */
import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import initBot from './initBot';
import { log } from './debug';

const app = express();
const { port, bots: botConfigs } = config;

// to support JSON-encoded bodies
app.use(bodyParser.json());
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

botConfigs.forEach((botConfig) => {
  app.use(initBot(botConfig));
});

app.listen(port, () => {
  log(new Date(), `Express server is up. Port: ${port}`);
});
