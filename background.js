const total = 0;
const sub_total = 0; // total action per type

let opened_tab_id = 0;

const config = {
    enable: 0,
    max: 3,
    ig_like: false,
    ig_follow: false,
    tiktok_like: false,
    tiktok_follow: false,
    fb_post_like: false,
    fb_like: false,
    twitter_follow: false,
    twitter_like: false,
    yt_sub: false,
    yt_like: false,
    sc_follow: false,
    sc_like: false,
    reddit_follow: false,
    reddit_like: false,
    actionType: 3,
};

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        if (request.action === "set") {
            config.enable = request.enable;
            config.max = parseInt(request.max);

            config.ig_like = request.ig_like;
            config.ig_follow = request.ig_follow;
            config.tiktok_like = request.tiktok_like;
            config.tiktok_follow = request.tiktok_follow;
            config.fb_post_like = request.fb_post_like;
            config.fb_like = request.fb_like;
            config.twitter_follow = request.twitter_follow;
            config.twitter_like = request.twitter_like;
            config.yt_sub = request.yt_sub;
            config.yt_like = request.yt_like;
            config.sc_follow = request.sc_follow;
            config.sc_like = request.sc_like;
            config.reddit_follow = request.reddit_follow;
            config.reddit_like = request.reddit_like;

            send_enable();
            return;
        }

        if (request.action === "get") {
            let vtabid = 0;
            if ((sender) && (sender.tab) && (sender.tab.id))
                vtabid = sender.tab.id;

            const message = {
                action: "set",
                enable: config.enable,
                max: config.max,
                ig_like: config.ig_like,
                ig_follow: config.ig_follow,
                tiktok_like: config.tiktok_like,
                tiktok_follow: config.tiktok_follow,
                fb_post_like: config.fb_post_like,
                fb_like: config.fb_like,
                twitter_follow: config.twitter_follow,
                twitter_like: config.twitter_like,
                yt_sub: config.yt_sub,
                yt_like: config.yt_like,
                sc_follow: config.sc_follow,
                sc_like: config.sc_like,
                reddit_follow: config.reddit_follow,
                reddit_like: config.reddit_like,

                actType: config.actionType,
                tabid: vtabid
            };
            opened_tab_id = vtabid;
            sendResponse(message);
            if (vtabid !== 0)
                send_notify("opened", opened_tab_id);
            return;
        }

        if (request.action === "setActType") {

            config.actionType = request.actType;
            console.log("actionType set to : " + config.actionType);
            return;
        }

        if (request.action === "log") {
            console.log(request.log);
            return;
        }

    });

function send_enable() {

    chrome.tabs.query({}, function (tabs) {
        const message = {
            action: "set",
            enable: config.enable,
            max: config.max,
            ig_like: config.ig_like,
            ig_follow: config.ig_follow,
            tiktok_like: config.tiktok_like,
            tiktok_follow: config.tiktok_follow,
            fb_post_like: config.fb_post_like,
            fb_like: config.fb_like,
            twitter_follow: config.twitter_follow,
            twitter_like: config.twitter_like,
            yt_sub: config.yt_sub,
            yt_like: config.yt_like,
            sc_follow: config.sc_follow,
            sc_like: config.sc_like,
            reddit_follow: config.reddit_follow,
            reddit_like: config.reddit_like,

            actType: config.actionType
        };
        for (let i = 0; i < tabs.length; ++i) {
            chrome.tabs.sendMessage(tabs[i].id, message);
        }
    });
}

function send_notify(vaction, vtabid) {
    chrome.tabs.query({}, function (tabs) {
        var message = {action: vaction, tabid: vtabid};
        for (var i = 0; i < tabs.length; ++i) {
            chrome.tabs.sendMessage(tabs[i].id, message);
        }
    });
}

chrome.tabs.onRemoved.addListener(function (tabid, removed) {
    if (tabid === opened_tab_id) {
        opened_tab_id = 0;
        send_notify("closed", tabid);
    }
})

chrome.storage.sync.get('max', function (data) {
    if ((data.max) && (data.max !== 0)) {
        config.max = data.max;
        console.log("Max From config : " + config.max);
    }
});

chrome.storage.sync.get('instagram-like', function (data) {
    if ((data.ig_like) && (data.ig_like !== 0)) {
        config.ig_like = data.ig_like;
        console.log("instagram-like From config : " + config.ig_like);
    }
});

chrome.storage.sync.get('instagram-follow', function (data) {
    if ((data.ig_follow) && (data.ig_follow !== 0)) {
        config.ig_follow = data.ig_follow;
        console.log("instagram-follow From config : " + config.ig_follow);
    }
});

chrome.storage.sync.get('tiktok-like', function (data) {
    if ((data.tiktok_like) && (data.tiktok_like !== 0)) {
        config.tiktok_like = data.tiktok_like;
        console.log("tiktok-like From config : " + config.tiktok_like);
    }
});

chrome.storage.sync.get('tiktok-follow', function (data) {
    if ((data.tiktok_follow) && (data.tiktok_follow !== 0)) {
        config.tiktok_follow = data.tiktok_follow;
        console.log("tiktok-follow From config : " + config.tiktok_follow);
    }
});

chrome.storage.sync.get('facebook-post-like', function (data) {
    if ((data.fb_post_like) && (data.fb_post_like !== 0)) {
        config.fb_post_like = data.fb_post_like;
        console.log("facebook-post-like From config : " + config.fb_post_like);
    }
});

chrome.storage.sync.get('facebook-like', function (data) {
    if ((data.fb_like) && (data.fb_like !== 0)) {
        config.fb_like = data.fb_like;
        console.log("facebook-like From config : " + config.fb_like);
    }
});

chrome.storage.sync.get('twitter-follow', function (data) {
    if ((data.twitter_follow) && (data.twitter_follow !== 0)) {
        config.twitter_follow = data.twitter_follow;
        console.log("twitter-follow From config : " + config.twitter_follow);
    }
});

chrome.storage.sync.get('twitter-like', function (data) {
    if ((data.twitter_like) && (data.twitter_like !== 0)) {
        config.twitter_like = data.twitter_like;
        console.log("twitter-like From config : " + config.twitter_like);
    }
});

chrome.storage.sync.get('youtube-sub', function (data) {
    if ((data.yt_sub) && (data.yt_sub !== 0)) {
        config.yt_sub = data.yt_sub;
        console.log("youtube-sub From config : " + config.yt_sub);
    }
});

chrome.storage.sync.get('youtube-like', function (data) {
    if ((data.yt_like) && (data.yt_like !== 0)) {
        config.yt_like = data.yt_like;
        console.log("youtube-like From config : " + config.yt_like);
    }
});

chrome.storage.sync.get('sc-follow', function (data) {
    if ((data.sc_follow) && (data.sc_follow !== 0)) {
        config.sc_follow = data.sc_follow;
        console.log("sc-follow From config : " + config.sc_follow);
    }
});

chrome.storage.sync.get('sc-like', function (data) {
    if ((data.sc_like) && (data.sc_like !== 0)) {
        config.sc_like = data.sc_like;
        console.log("sc-like From config : " + config.sc_like);
    }
});

chrome.storage.sync.get('reddit-follow', function (data) {
    if ((data.reddit_follow) && (data.reddit_follow !== 0)) {
        config.reddit_follow = data.reddit_follow;
        console.log("reddit-follow From config : " + config.reddit_follow);
    }
});

chrome.storage.sync.get('reddit-like', function (data) {
    if ((data.reddit_like) && (data.reddit_like !== 0)) {
        config.reddit_like = data.reddit_like;
        console.log("reddit-like From config : " + config.reddit_like);
    }
});

console.log(data)
