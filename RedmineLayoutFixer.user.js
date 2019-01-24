// ==UserScript==
// @name     Redmine Issue Header Layout fixer
// @namespace    https://github.com/suterma/
// @description In Redmine issue tracking, issue details view, moves the issue's content title in the issue body part, next to the exisiting subjet. This allows easy copy-paste of the issue's caption, consisting of the issue title and subject at once.
// @author       opensource@marcelsuter.ch, GPLv3 License
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
// 1.01   (2019-01-24) Try to use a button for copy-paste
// ---------------------------------------

(function () {
  'use strict';

  // get the content header of an issue
  var issueHeader = $("html body.controller-issues div#wrapper div#main div#content h2");

  // insert it into the subject of the issue
  var issueSubject = $("html body div#main div#content div.issue div.subject");
  //issueSubject.insertAdjacentElement('afterbegin', issueHeader);
  issueSubject.prepend(issueHeader);
  
  //TODO try a button to copy a text for selection (does not work right now)
  var button = document.createElement('input');
  button.type  = 'button';
  button.value = 'copy';
  button.addEventListener('click', function() {
    //$("div.subject").innerHTML.select();
    //document.execCommand("copy");
    //alert("Copied the text: " + $("html body div#main div#content div.issue div.subject").innerText);
    var subjectNode = $("div.subject h3");
    alert(subjectNode.text());
    //TODO continue: Der subject node ist irgendwie nicht richtig definiert. Das untenstehende Select funktioniert nicht
    
    var range = document.createRange();
     range.selectNode(subjectNode);
     document.window.getSelection().addRange(range);
     document.execCommand("copy");
     alert("text copied") ;
    
    
  }, false);
  //button.insertBefore(issueHeader);
  //issueHeader.appendChild(button);
  issueSubject.append(button);

}) ();
