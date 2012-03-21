/**
 * player.js
 * Injects JS into the google play page in order to call SJBaddListener, which adds a callback when songs change.
 * Copyright (c) 2011 2012 Nicholas Letourneau (http://nicholasletourneau.com)
 * Licensed under the MIT license http://www.opensource.org/licenses/mit-license.php
 */

var port = chrome.extension.connect({name: "growltunes"});

var passthrough = document.createElement("div");
passthrough.setAttribute("style", "display: none;");
passthrough.id = "cpgPassthrough";
document.body.appendChild(passthrough);

passthrough.addEventListener('displayCPGNotification', function() {
  var eventData = JSON.parse(document.getElementById('cpgPassthrough').innerText);
  port.postMessage(eventData);
});

var bindCommunication = function() { window.SJBaddListener('playSong', function(obj) {
  var customEvent = document.createEvent('Event');
  customEvent.initEvent('displayCPGNotification', true, true);

  hiddenDiv = document.getElementById('cpgPassthrough');
  hiddenDiv.innerText = JSON.stringify(obj.payload.song)
  hiddenDiv.dispatchEvent(customEvent);
})};

injectScript(bindCommunication);
