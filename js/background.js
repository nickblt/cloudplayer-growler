/**
 * background.js
 * Background page script
 * Copyright (c) 2011 Alexey Savartsov <asavartsov@gmail.com>
 * Modified by Nicholas Letourneau (http://nicholasletourneau.com) for Growl notifications
 * Licensed under the MIT license
 */


var player = {}; // Previous player state
// Connect event handlers
chrome.extension.onConnect.addListener(port_on_connect);

/**
 * Content script has connected to the extension
 */
function port_on_connect(port) {
    console.assert(port.name == "growltunes"); 

    // Connect another port event handlers
    port.onMessage.addListener(port_on_message);
    port.onDisconnect.addListener(port_on_disconnect);
}
 
 /**
  * New message arrives to the port
  */
function port_on_message(message)
{
    // Current player state
    var _p = message;
    
    if(_p.has_song)
    {
        if(_p.is_playing)
        {
          growl.notify(_p.song.title, _p.song.artist, _p.song.cover);
          player = _p; // TODO: Save here?
        }
        else {
            // The player is paused
        }
    }
    else
    {
        player = {};
    }
}
 
 /**
  * Content script has disconnected
  */
function port_on_disconnect() {
    player = {}; // Clear player state
}
