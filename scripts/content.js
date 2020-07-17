const handle = () => {
    const url = window.location.host;
    const scripts = document.querySelectorAll('script');
    const trackers = {}
    scripts.forEach(s => {
        const {src} = s
        if(/google-analytics.com/.test(src)){
            trackers.google_analytics = true;
            return;
        }
        if(/googletagmanager.com/.test(src)){
            trackers.google_tag_manager = true;
            return;
        }
        if(/connect.facebook.net/.test(src)){
            trackers.facebook = true;
            return;
        }
        if(/cdn.taboola.com/.test(src)){
            trackers.taboola = true;
            return;
        }
        if(/c.amazon-adsystem.com/.test(src)){
            trackers.amazon = true;
            return;
        }
    } );
    chrome.runtime.sendMessage({
        context: "trackersDetection",
        website: url,
        trackers
    });
    console.log('trackers', trackers)
}

window.onload = handle
