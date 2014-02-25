// Based on Check My Links by Paul Livingstone @ocodia

var blacklistDefaults = 
    "googleleads.g.doubleclick.net\n" +
    "doubleclick.net\n" +
    "googleadservices.com\n" +
    "www.googleadservices.com\n" +
    "googlesyndication.com\n" +
    "adservices.google.com\n" +
    "web.adblade.com/clicks.php\n" +
    "appliedsemantics.com";

function loadOptions() {
  
  var bkg = chrome.extension.getBackgroundPage();
  var blacklistItems = bkg.getItem("blacklist");
  
  if (blacklistItems === null) {
    bkg.setItem("blacklist", blacklistDefaults);
  }

  
  //blacklistItems = bkg.getItem("blacklist");
  if(blacklistItems !== null){
    blacklistItems.split(" ");
  }

  document.getElementById("blacklistEntries").value = blacklistItems;
  
}

function saveOptions() {
  var bkg = chrome.extension.getBackgroundPage();
  var blacklistEntries = document.getElementById("blacklistEntries");

  // Save selected options to localstore
  bkg.setItem("blacklist", blacklistEntries.value);
  document.getElementById("msg").style.visibility = "visible";
}


document.querySelector('#save').addEventListener('click', saveOptions);

loadOptions();