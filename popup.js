// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


function click(e) {
    var count = 0;
    var prevpage = null;
    chrome.tabs.executeScript(null, {file: "jquery-1.11.3.js"});
    chrome.tabs.executeScript(null, {file: "script.js"});
    chrome.extension.onMessage.addListener(function (msg) {
        items = msg.items;
        $.each(items, function (i, e) {
            chrome.bookmarks.search({'url': e.url}, function (res) {
                if (res.length == 0) {
                    chrome.bookmarks.create({title: e.title, url: e.url}, function (obj) {
                        console.log(obj);
                        count++;
                        $('#red').text('done - ' + count);
                    })
                }
                ;
            });
        });
        if (msg.next && msg.next != prevpage) {
            prevpage = msg.next;
            console.log(msg.next);
            chrome.tabs.update(null, {url: msg.next}, function () {
                console.log('reloading..');
                chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
                    chrome.tabs.onUpdated.addListener(function (arrayOfTabs, changeInfo, tab) {
                        if (changeInfo.status == 'complete' && tab.id == arrayOfTabs) {
                            console.log('reload page done');
                            chrome.tabs.executeScript(null, {file: "jquery-1.11.3.js"});
                            chrome.tabs.executeScript(null, {file: "script.js"});

                        }
                    })
                });
            });
        }
        ;
    })
};

document.addEventListener('DOMContentLoaded', function () {
    var divs = document.querySelectorAll('div');
    divs[0].addEventListener('click', click);
});
