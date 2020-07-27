const  trackersMap = {
    google_analytics: 'Google Analytics',
    google_tag_manager: 'Google Tag Manager',
    facebook: 'Facebook',
    taboola: 'Taboola',
    amazon: 'Amazon',
}

const callBack = (res) => {
    console.log('res', res)
    const {current, history} = res
    currentHandler(current)
    historyHandler(history)

}
const currentHandler = (cur) => {
    const curListTag = document.getElementById('currentList')
    curListTag.innerHTML = ""
    for(const key in cur.trackers){
        curListTag.innerHTML += `<li class="list-group-item">${trackersMap[key]} - ${cur.trackers[key] ? "detected" : 'not detected'}</li>`
    }
}
const historyHandler = (history) => {
    for(const key in history){
        console.log('key', key)
        const keyHtmlTag = document.getElementById(`${key}_list`)
        if(history[key].length > 0 ){
            keyHtmlTag.innerHTML = ""
            history[key].forEach(value => {
                keyHtmlTag.innerHTML += `<li class="">${value}</li>`
            })

        }else{
            keyHtmlTag.innerHTML = "not detected"
        }
    }

}
window.onload = () => {
    const fList = document.getElementById('facebook_list')
    console.log('I am here')
    chrome.runtime.sendMessage({
        context: "popUpDataHisotry",
    },callBack);
}