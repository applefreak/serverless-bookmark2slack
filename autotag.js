
var _ = require('lodash');
var validUrl = require('valid-url');
var URL = require('url-parse');

var default_sites = {
	'github.com': 'Github',
	'medium.com': 'Medium',
	'reddit.com': 'Reddit',
};

var autoTag = (tags, url) => {
	var result = '';
	if (! _.isArray(tags)) throw 'tags not an array!';
	if (validUrl.isUri(url) === undefined) throw 'URL is not valid!';

	var parsed = URL(url);
	var hostname = default_sites[parsed.hostname];
	if (hostname !== undefined) {
		tags.push(hostname);
	}

	if (tags.length > 0) {
		result = toTagString(tags);
	}

	return result;
}

// tags is array of strings
var toTagString = (tags) => {
	if (! _.isArray(tags)) throw 'tags not an array!';

	return ' #' + _.join(tags, ' #');
}

module.exports = autoTag;
