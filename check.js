// Based on Check My Links by Paul Livingstone @ocodia

String.prototype.startsWith = function(text) {
	return this.substr(0, text.length) == text;
};

String.prototype.contains = function(text) {
	return this.indexOf(text) !== -1;
};

if (typeof _loaded === 'undefined') {
	chrome.extension.onMessage.addListener(

	function(request, sender) {

		// Gather links
		var pageLinks = document.getElementsByTagName('a');

		(function(pg) {

			var blacklist = request.bl;
			blacklist = blacklist.split("\n");

			var blacklisted;

			// Run through links ignore empty href and non http* links
			for (var i = 0; i < pg.length; i++) {

				var link = pg[i];
				var url = link.href;
				var rel = link.rel;
				blacklisted = false;

				if (url.length > 0 && url.startsWith('http')) {
					for (var b = 0; b < blacklist.length; b++) {
						if (blacklist[b] !== "" && url.contains(blacklist[b])) {
							blacklisted = true;
						}
					}

					if (blacklisted === false) {
						// console.log(url);
					} else {
						chrome.extension.sendMessage({
							"action" : "check",
							"url" : url
						});

					}

				} else {
					// console.log("Skipped: " + url);
				}
			}

		}(pageLinks));

	});
	_loaded = true;
}