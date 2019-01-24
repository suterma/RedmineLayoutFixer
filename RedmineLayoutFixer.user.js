// ==UserScript==
// @name     Redmine Issue Header Layout fixer
// @namespace    https://github.com/suterma/
// @description In Redmine issue tracking, issue details view, moves the issue's content title in the issue body part, next to the exisiting subjet. This allows easy copy-paste of the issue's caption, consisting of the issue title and subject at once.
// @copyright    opensource@marcelsuter.ch, GPLv3 License
// @author       opensource@marcelsuter.ch
// @require  https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @include  https://*/redmine/issues/*
// @version  1.0
// @grant    none
// @downloadURL  https://github.com/suterma/RedmineLayoutFixer/raw/master/RedmineLayoutFixer.user.js
// @updateURL    https://github.com/suterma/RedmineLayoutFixer/raw/master/RedmineLayoutFixer.user.js
// ==/UserScript==
// ---------------------------------------
// Changelog
// 1.0    (2019-01-24) Initial version
// ---------------------------------------

(function () {
  'use strict';

  // get the content header of an issue
  var issueHeader = $('html body.controller-issues div#wrapper div#main div#content h2');

  // insert it into the subject of the issue
  issueHeader.insertBefore( 'html body div#main div#content div.issue div.subject' );

}) ();
