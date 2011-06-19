/**
 * player.js (originally: contentscripts.js)
 * Parses player page and transmit song information to background page
 * Copyright (c) 2011 Alexey Savartsov, <asavartsov@gmail.com>, Brad Lambeth <brad@lambeth.us>
 * Modified by Nicholas Letourneau (http://nicholasletourneau.com) for Growl notifications
 * Licensed under the MIT license
 */

/**
 * Player class
 *
 * Cloud Player page parser
 */
function Player(parser) {	
    this.has_song = parser._get_has_song();
    this.is_playing = parser._get_is_playing();
    this.song = {
        position: parser._get_song_position(),
        time: parser._get_song_time(),
        display_time: parser._get_song_display_time(),
        title: parser._get_song_title(),
        artist: parser._get_song_artist(),
        album: parser._get_song_album(),
        cover: parser._get_song_cover()
    };
}

var port = chrome.extension.connect({name: "growltunes"});
var player = new Player(new GoogleMusicParser());

window.setInterval(
  function()
  {
    var newplayer = new Player(new GoogleMusicParser());
    if (newplayer.has_song && newplayer.is_playing &&
      (player.song.title != newplayer.song.title || player.song.artist != newplayer.song.artist))
    {
      port.postMessage(newplayer);
      player = newplayer;
    }
     
  }, 
  250
);	
