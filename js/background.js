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
  var minutes = Math.floor(song.durationMillis/60000);
  var seconds = Math.floor(song.durationMillis/1000 % 60)+"";
  if (seconds.length == 1)
    seconds = "0" + seconds;

  var duration = "0:00/" + minutes + ":" + seconds;
  growl.notify(song.title, duration + "\n" + song.artist + "\n" + song.album, "http:" + song.albumArtUrl);
}
