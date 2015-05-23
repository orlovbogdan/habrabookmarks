// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
$(function(){
    var size = $('.posts_list .posts .post .title a.post_title').size();
    console.log(size);
    if (size > 0){
        var items = [];
        $('.posts_list .posts .post .title a.post_title').each(function(){
            items.push({ url: $(this).attr('href'), title: $(this).text()});
        });
        var msg = {items: items, next: window.location.origin + $('.page-nav .next').attr('href')};
        chrome.extension.sendMessage(msg);
    }
});

