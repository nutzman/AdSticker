// Based on Check My Links by Paul Livingstone @ocodia

var checkType;

var _toClose = new Array();

chrome.extension.onMessage.addListener(onRequest);

chrome.tabs.onUpdated.addListener(function(tabId, info) {
	if (info.status == "complete") {
		for (var i = 0; i < _toClose.length; i++) {
			if (tabId == _toClose[i]) {
				_toClose.splice(i, 1);
				chrome.tabs.remove(tabId);
			}
		}
		
	}
});

chrome.browserAction.onClicked.addListener(function(tab) {

	chrome.tabs.executeScript(tab.id, {
		file : 'check.js',
		allFrames: true
	}, function() {

		var blacklistDefaults = "googleleads.g.doubleclick.net\n"
				+ "doubleclick.net\n" + "googleadservices.com\n"
				+ "www.googleadservices.com\n" + "googlesyndication.com\n"
				+ "adservices.google.com\n" + "waynote.net\n"
				+ "appliedsemantics.com\n" + 
				"r.turn.com\n" + 
				"clk.atdmt.com\n" + 
				"www.facebook.com/a.php\n" + 
				"spongecell.com/api/ad_tags\n"+
				"secure-lax.adnxs.com\n"+
				"st.blogads.com";
		
		// Set up the defaults if no values are present in LocalStorage
		if (getItem("blacklist") === null) {
			setItem("blacklist", blacklistDefaults);
		}

		var blacklist = getItem("blacklist");

		chrome.tabs.sendMessage(tab.id, {
			bl : blacklist
		});
	});
});

function onRequest(request, sender, callback) {
	if (request.action == "check") {
		if (request.url) {
			var newURL = request.url;
			chrome.tabs.create({
				url : newURL
			}, function(tab) {
				_toClose.push(tab.id);
			});
		}
	}
	return true;
}



// OPTIONS: Management

// OPTIONS: Set items in localstore
function setItem(key, value) {
	try {
		
		window.localStorage.removeItem(key);
		window.localStorage.setItem(key, value);
	} catch (e) {
		
	}

}

// OPTIONS: Get items from localstore
function getItem(key) {
	var value;
	
	try {
		value = window.localStorage.getItem(key);
	} catch (e) {
		value = "null";
	}
	
	return value;
}

// OPTIONS: Zap all items in localstore
function clearStrg() {

	window.localStorage.clear();
}

