import express from 'express';
import TelegramBot from 'node-telegram-bot-api';
import path from 'path';
import renderFile from '../renderFile/index.js';
import { log } from '../debug';

const router = express.Router(); // eslint-disable-line

export default (config) => {
  const { routeName, token, channelId, templatesPath } = config;

  const route = `/api/v1/${routeName}`;

  log('initBot', token);
  log('routeName:', route);

  const bot = new TelegramBot(token, { polling: true });

  router.get(path.join(route, '/messages'), (request, response) => {
    const message = request.query.text || '';

    try {
      bot.sendMessage(channelId, message);
    } catch (err) {
      throw Error('Cannot sendMessage!', err);
    }

    response.send({
      success: true,
    });
  });


  router.post(path.join(route, '/messages'), (request, response) => {
    const webhookEvent = request.body.webhookEvent;
    let templatePath;

    log('request', JSON.stringify(request.body));

    switch (webhookEvent) {
      case 'jira:issue_created':
        templatePath = path.join(templatesPath, 'issue', 'created', 'index.ejs');
        log('Event jira:issue_created:', JSON.stringify(request.body));
        break;
      case 'jira:issue_updated':
        log('Event jira:issue_updated:', JSON.stringify(request.body));
        break;
      case 'comment_updated':
        // templatePath = path.join(rootPathTemplate, 'comment', 'updated', 'index.ejs');
        break;
      default :
        break;
    }

    if (!templatePath) {
      log(new Date(), 'Empty template path. webhookEvent: ', webhookEvent);
      response.send({
        success: false,
      });

      return false;
    }

    renderFile(templatePath, request.body).then((template) => {
      try {
        log(template);
        bot.sendMessage(channelId, template, {
          parse_mode: 'HTML',
        });
      } catch (err) {
        throw Error(new Date(), 'Cannot sendMessage!', err);
      }
    }, (err) => {
      throw Error(new Date(), 'Cannot sendMessage!', err);
    });

    response.send({
      success: true,
    });

    return true;
  });

  return router;
};