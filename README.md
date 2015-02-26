# OpenWebScrobbler
An open source Last.fm scrobbler for the web.


## Motivation
I was an occasional user of *Universal Scrobbler*, which was a nice (and free) service. ~~But everything changed when the fire nation attacked.~~
The owner decided to make it a paid service, which left me with nothing but frustration. That's why I created this tool. This tool is free and gratis.


## Usage
You may use it directly from here: [http://ows.elamperti.com/](http://ows.elamperti.com/)

Or host your own instance at your server following the setup instructions.


## Requirements
### Server
You need a PHP enabled server with the *curl* and *SimpleXML* extensions (they are pretty common).
Optional: SSH access if you plan to use rsync (via Grunt).

### Local
This app is built using [Grunt](http://gruntjs.com/). You should have grunt and npm installed. [Composer](https://getcomposer.org/) is also required.


## Setup
  * Run `npm install` to download the required Grunt plugins.
  * Run `composer install` to download Composer dependencies.
  * [Create a Last.fm API account](http://www.last.fm/api/account/create) 
  * Point your API account's **callback URL** to your ows `callback.php`
  * Copy your API key and secret to `config.sample.php` and save it as `config.php`
  * You may add an Analytics tracking code to `config.php` to track pageviews.
  * Modify `Gruntfile.js` so the *rsync* task `dest` points to your server (e.g. `user@host:public_html/ows/`).


## ToDo
  * Scrobble through AJAX
  * Check sessions' duration
  * Add a footer linking to this Github repo
  * Enable grunt-uncss (and similar optimizations)
  * Complete this readme file

## Wishlist
  * Track scrobble event with Analytics (to count how many scrobbles have been made through this tool)
  * ~~Add user's avatar to the toolbar~~
  * Checkbox: love this track
  * Allow custom time
  * Create a notification on logout
  * Add timer to the alerts
  * Share buttons for facebook, twitter, etc.
  * Autocomplete for artist/tracks? (issue #1)
  * A better logo
