const path = require('path');

export default {
  port: 7777,
  debug: isDebug,
  bots: [
    {
      routeName: 'some route',
      channelId: 'channelId',
      templatesPath: path.join(__dirname, '../Templates', 'JIRA'),
      token: 'token',
    },
  ],
};
