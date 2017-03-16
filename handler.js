'use strict';

var Botkit = require('botkit');
var autotag = require('./autotag');
var controller = Botkit.slackbot();

module.exports.bookmark = (event, context, callback) => {
  var response_body = {
    success: false,
  };

  try {
    var bot = controller.spawn({
      token: process.env.SLACK_TOKEN
    });
    var req_body = JSON.parse(event.body);
    if (!('tags' in req_body)) req_body.tags = [];
    var tags = autotag(req_body.tags, req_body.url);
    bot.say({
      text: '@paperbot ' + req_body.url + tags,
      channel: process.env.SLACK_BOOKMARK_CHANNEL
    });

    response_body.success = true;

  } catch(e) {
    console.log('An error has occured:');
    console.log(e);
    response_body.error = e;
  }

  var response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
    },
    body: JSON.stringify(response_body),
  };

  callback(null, response);
};
