# Telegram Channel bot

### Telegram bot that sends a message to the channel when fires webhook in JIRA or BitBucket(feature).

### Roadmap

* Create telegram bot by [BotFather](https://telegram.me/botfather)
* Config app in ```src/config/index.js```
* Set webhook in JIRA to app bot route (for example ```/api/v1/route/messages```)

### TODO:

* Add templates to few [events of JIRA](https://developer.atlassian.com/static/connect/docs/latest/modules/common/webhook.html):
    * ~~jira:issue_created~~
    * jira:issue_updated
* Add templates to few events of bitbucket 
    * Create Pull Request
    * Create comment to Pull Request
    
### References
* [Get channel id for private channel](http://stackoverflow.com/a/33862907)