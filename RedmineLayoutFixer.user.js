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
  var button = document.createElement('a');
  button.setAttribute('href', 'javascript:void(0)');
  button.innerHTML = '&nbsp;';
  button.className = "copy-icon";
  button.title ='Click to copy the subject to the clipboard.';
  button.addEventListener('click', function() {
    //$("div.subject").innerHTML.select();
    //document.execCommand("copy");
    //alert("Copied the text: " + $("html body div#main div#content div.issue div.subject").innerText);
    var subjectNode = $("div.subject");
    //TODO continue: Der subject node ist irgendwie nicht richtig definiert. Das untenstehende Select funktioniert nicht
    
    navigator.clipboard.writeText(subjectNode.text());
    alert(subjectNode.text());
    
    /*
    var range = document.createRange();
     range.selectNode(subjectNode);
     document.window.getSelection().addRange(range);
     document.execCommand("copy");
     alert("text copied") ;
    */
    
  }, false);
  var subjectTitle = $("div.subject h3");
  subjectTitle.append(button);
  //button.insertBefore(issueHeader);
  //issueHeader.appendChild(button);
  //issueSubject.append(button);

}) ();
