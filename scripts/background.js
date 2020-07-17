const inArray = (arr, needle) => {
    console.log('needle', needle)
    console.log('arr', arr)
    return !!arr.find(obj => obj === needle);
}
const pushIfUnique = (arr, needle) => {
    if(!inArray(arr, needle)){
        arr.push(needle);
    }
    return arr;
}
const updateCurrent = (host, trackers) => {
    if (host != current.host) current.trackers = initialTrackers;

    current.trackers = {...current.trackers,...trackers};
    current.host = host;
}
const updateHistory = (host, trackers) => {
    for(const key in history){
        if(trackers[key]){
            history[key] = pushIfUnique(history[key],host)
        }
    }
}
const  initialTrackers = {
    google_analytics: false,
    google_tag_manager: false,
    facebook: false,
    taboola: false,
    amazon: false,
}
const current = {
    host: '',
    trackers: initialTrackers
}
const history = {
    google_analytics: [],
    google_tag_manager: [],
    facebook: [],
    taboola: [],
    amazon: [],
}

updateTrackers = (host, trackers) => {
    updateCurrent(host, trackers);
    updateHistory(host, trackers);
    console.log('current', current);
    console.log('history', history);
}
const messageListener = (request, sender, sendResponse) =>{
    const { context, website, trackers} = request
    switch (context){
        case 'trackersDetection':
            updateTrackers(website, trackers)
            break;
        case 'popUpData':
            sendResponse({history, current})
            break;
    }
}
chrome.runtime.onMessage.addListener(messageListener)