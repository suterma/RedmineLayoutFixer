// ==UserScript==
// @name         RedmineLayoutFixer, rearranges the layout of Redmine issue pages.
// @namespace    https://github.com/suterma/
// @description  In Redmine issue tracking, issue details view, moves the issue's content title in the issue body part, next to the exisiting subjet. This allows easy copy-paste of the issue's caption, consisting of the issue title and subject at once.
// @author       opensource@marcelsuter.ch, GPLv3 License
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @include      https://*redmine*/issues/*
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

  //Add css (this is a minified version of the RedmineLayoutFixer.user.css file, processed by https://cssminifier.com/)
  addGlobalStyle(".copy-icon{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZGF0YS1pY29uPSJmaWxlIiB2aWV3Qm94PSIwIDAgOCA4Ij4gPHBhdGggc3R5bGU9ImZpbGw6cmdiKDg1LCA4NSwgODUpOyIgZD0iTTAgMHY4aDd2LTRoLTR2LTRoLTN6bTQgMHYzaDNsLTMtM3oiIC8+PC9zdmc+);background-size:1em;background-repeat:no-repeat;background-position:center;height:1.5em;width:1.5em;display:inline-flex;margin-left:5px}#header,#main,#top-menu,#wrapper3,div.subject h2{margin:0}.copy-icon:hover{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZGF0YS1pY29uPSJmaWxlIiB2aWV3Qm94PSIwIDAgOCA4Ij4gPHBhdGggc3R5bGU9ImZpbGw6cmdiKDE5OCwgMjYsIDI2KTsiIGQ9Ik0wIDB2OGg3di00aC00di00aC0zem00IDB2M2gzbC0zLTN6IiAvPjwvc3ZnPg==);text-decoration-line:none}div.issue{background:0 0;padding:0;border:none}#content{background-color:#ffd}#issue-changesets div.changeset:nth-child(2n),.even,div#issue-changesets,table.list:not(.odd-even) tbody tr:nth-child(2n){background:#f0f0f0}");

  // get the content header of an issue
  var issueHeader = $("html body.controller-issues div#wrapper div#main div#content h2");

  // insert it into the subject of the issue, to have it inline within the issue
  var issueSubject = $("html body div#main div#content div.issue div.subject");
  issueSubject.prepend(issueHeader);
  
  // create a clickable link, to copy the subject text
  var anchor = document.createElement('a');
  anchor.setAttribute('href', 'javascript:void(0)');
  anchor.innerHTML = '&nbsp;';
  anchor.className = "copy-icon";
  anchor.title ='Click to copy the subject to the clipboard, using foswiki markup.';
  anchor.addEventListener('click', function() {    
    var outputIssueHeaderText = $("html body div#main div#content div.issue div.subject h2").text();
    var outputIssueSubjectText = $("html body div#main div#content div.issue div.subject h3").text();
    //Replace leading 'CR' to ChangeRequest, for typical use as foswiki WikiWord
    var foswikiOutputIssueSubjectText = outputIssueSubjectText.replace(/^CR\s/gm, 'ChangeRequest');
    var subjectNode = $("div.subject");
    var outputText = outputIssueHeaderText + " - " + foswikiOutputIssueSubjectText;
    navigator.clipboard.writeText(outputText);
  }, false);
  
  //Attach the anchor link to the subject
  var subjectTitle = $("div.subject h3");
  subjectTitle.append(anchor);
}) ();
