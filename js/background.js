/**
 * background.js
 * Background page script
 * Copyright (c) 2011 2012 Nicholas Letourneau (http://nicholasletourneau.com)
 * Licensed under the MIT license http://www.opensource.org/licenses/mit-license.php
 */

chrome.extension.onConnect.addListener(port_on_connect);

function port_on_connect(port) {
    console.assert(port.name == "growltunes");

    port.onMessage.addListener(port_on_message);
}

function port_on_message(song)
{
    growl.notify(song.title, song.artist, "http:" + song.albumArtUrl);
}
