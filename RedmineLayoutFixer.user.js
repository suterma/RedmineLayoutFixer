// ==UserScript==
// @name         RedmineLayoutFixer, rearranges the layout of Redmine issue pages.
// @namespace    https://github.com/suterma/
// @description  In Redmine issue tracking, issue details view, moves the issue's content title in the issue body part, next to the exisiting subjet. This allows easy copy-paste of the issue's caption, consisting of the issue title and subject at once.
// @author       opensource@marcelsuter.ch, GPLv3 License
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @include      https://*/redmine/issues/*
// @version      1.02
// @grant        none
// @downloadURL  https://github.com/suterma/RedmineLayoutFixer/raw/master/RedmineLayoutFixer.user.js
// @updateURL    https://github.com/suterma/RedmineLayoutFixer/raw/master/RedmineLayoutFixer.user.js
// ==/UserScript==
// ---------------------------------------
// Changelog
// 1.0    (2019-01-24) Initial version
// 1.01   (2019-01-24) Use a button for copy-paste
// 1.02   (2019-01-30) Style for foswiki
// ---------------------------------------

(function () {
  'use strict';
    //Add the styles
    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    //Add css (this is a minified version of the RedmineLayoutFixer.user.css file)
    //TODO minify and insert
    addGlobalStyle(".copy-icon{}");

  // get the content header of an issue
  var issueHeader = $("html body.controller-issues div#wrapper div#main div#content h2");

  // insert it into the subject of the issue
  var issueSubject = $("html body div#main div#content div.issue div.subject");
  issueSubject.prepend(issueHeader);
  
  // create a clickable link, to copy the subject text
  var anchor = document.createElement('a');
  anchor.setAttribute('href', 'javascript:void(0)');
  anchor.innerHTML = '&nbsp;';
  anchor.className = "copy-icon";
  anchor.title ='Click to copy the subject to the clipboard.';
  anchor.addEventListener('click', function() {    
    var outputIssueHeaderText = $("html body div#main div#content div.issue div.subject h2").text();
    var outputIssueSubjectText = $("html body div#main div#content div.issue div.subject h3").text();
    var subjectNode = $("div.subject");
    var outputText = outputIssueHeaderText + " - " + outputIssueSubjectText;
    navigator.clipboard.writeText(outputText);
  }, false);
  
  var subjectTitle = $("div.subject h3");
  subjectTitle.append(anchor);
}) ();
