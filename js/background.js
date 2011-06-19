/**
 * background.js
 * Background page script
 * Copyright (c) 2011 Alexey Savartsov <asavartsov@gmail.com>
 * Modified by Nicholas Letourneau (http://nicholasletourneau.com) for Growl notifications
 * Licensed under the MIT license
 */

// Connect event handlers
chrome.extension.onConnect.addListener(port_on_connect);

/**
 * Content script has connected to the extension
 */
function port_on_connect(port) {
    console.assert(port.name == "growltunes"); 

    // Connect another port event handlers
    port.onMessage.addListener(port_on_message);
}
 
 /**
  * New message arrives to the port
  */
function port_on_message(player)
{
    growl.notify(player.song.title, player.song.artist, player.song.cover);
}
