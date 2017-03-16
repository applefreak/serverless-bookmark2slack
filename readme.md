# Bookmark2Slack

Taking advantage of Skore's Paperbot to create my own article digest, using a bot built with the Serverless framework!

## Install

First install the [Serverless](https://serverless.com/) framework. At the time of writing, Serverless is on version v1.8.0.

	$ npm install serverless -g

Setup Serverless credentials, see [here](https://serverless.com/framework/docs/providers/aws/guide/credentials/) for help. 

Clone this repository, then install using Serverless

	$ git clone https://github.com/applefreak/serverless-bookmark2slack.git
	$ cd serverless-bookmark2slack
	$ sls install

## Setup

Add [Paperbot](http://paperbot.ai/) to your Slack channel.

Get your Slack bot API key. Go [here](https://my.slack.com/services/new/bot), sign in to your team. Give your bot a name, then click __Add Integration__. On the next page, you'll see your API key. 

Copy `secrets.example.yml`, then rename it to `secrets.yml`. Change `YOUR_SLACK_KEY_HERE` to the key you got from last step, then save the file.

Open `serverless.yml` and change which channel this bot will publish to.

	custom:
	  secrets: ${file(secrets.yml)}
	  dev: dev
	  prod: bookmarks

`dev` and `prod` is the different stages of this Serverless service. Where `dev` and `bookmarks` is the channel where the final message this bot will send to. For example, if you deploy using `sls deploy` this defaults to `dev` stage, the message will be sent to your Slack team's __Dev__ channel. Likewise, if you deployed using `sls deploy --stage prod`, the message will be send to the __Bookmarks__ channel.

## Deploy

	$ sls deploy

This will send the message to __Dev__ channel. You'll get an URL that you can POST to.

## To make request to it

To make request to this API, make sure your request body's content type is `application/json`, and the structure looks like this:

	{
	  "url": "http://example.com",
	  "tags": [
	    "tag1",
	    "tag2"
	  ]
	}

You can easily call it up using bookmarklets, like so:

	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
	    if (request.readyState == XMLHttpRequest.DONE) {
	        console.log(request.responseText);
	    }
	}
	request.open('POST', 'https://<YOUR_API_GATEWAY_URL_HERE>/prod/add', true);
	request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	request.send(JSON.stringify({url:window.location.href, tags:['Cool']}));

Then put it through sites like this [Bookmarkleter](http://chriszarate.github.io/bookmarkleter/).

## Done

That's about it! I've written a post about this project, you can check it out [here](https://poyu.xyz/projects/serverless-bookmark2slack/).
