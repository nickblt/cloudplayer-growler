/**
 * GoogleMusicParser.js (originally contentscripts.js)
 * Parses player page and transmit song information to background page
 * Copyright (c) 2011 Alexey Savartsov, <asavartsov@gmail.com>, Brad Lambeth <brad@lambeth.us>
 * Modified by Nicholas Letourneau (http://nicholasletourneau.com) for Growl notifications
 * Licensed under the MIT license
 */

/**
 * Constructor for parser class
 * Executes scripts to fetch now playing info from cloudplayer
 * @returns {GoogleMusicParser}
 */
GoogleMusicParser = function() {

};

/**
 * Check whether a song loaded into player widget
 *
 * @return true if some song is loaded, otherwise false
 */
GoogleMusicParser.prototype._get_has_song = function() {
    return $("#playerSongInfo div").hasClass("goog-inline-block goog-flat-button");
};

/**
 * Checks whether song is playing or paused
 *
 * @return true if song is playing, false if song is paused
 */
GoogleMusicParser.prototype._get_is_playing = function() {
    return ($("#playPause").attr("title") == "Pause");
};

/**
 * Get current song playing position
 *
 * @return Playing position in seconds
 */
GoogleMusicParser.prototype._get_song_position = function() {
    var _time = $("#currentTime").text();
    _time = $.trim(_time).split(':');
    if(_time.length == 2) {
        return (parseInt(_time[0], 10) * 60 + parseInt(_time[1], 10));
    }
    else {
        return 0;
    }
};

/**
 * Get current song length
 *
 * @return Song length in seconds
 */
GoogleMusicParser.prototype._get_song_time = function() {
    var _time = $("#duration").text();
    _time = $.trim(_time).split(':');
    if(_time.length == 2) {
        return (parseInt(_time[0], 10) * 60 + parseInt(_time[1], 10));
    }
    else {
        return 0;
    }
};

GoogleMusicParser.prototype._get_song_display_time = function() {
    return $("#duration").text();
};

/**
 * Get current song title
 *
 * @return Song title
 */
GoogleMusicParser.prototype._get_song_title = function() {
    // the text inside the div located inside element with id="playerSongTitle"
    return $("#playerSongTitle div").text();
};

/**
 * Get current song artist
 *
 * @return Song artist
 */
GoogleMusicParser.prototype._get_song_artist = function() {
    return $("#playerArtist div").text();
};

/**
 * Get current song artwork
 *
 * @return Image URL or default artwork
 */
GoogleMusicParser.prototype._get_song_cover = function() {
    var src = $("#playingAlbumArt").attr("src");
    if (src == "default_album_med.png")
      return "http://play.google.com/music/default_album_med.png"
    else
      return ("http:" + src);
};

/**
 * Get current song album name
 *
 * @return Album name or null
 */
GoogleMusicParser.prototype._get_song_album = function() {
    return null;
};
