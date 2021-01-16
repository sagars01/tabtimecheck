'use strict';

function epoch(date) {
    return Date.parse(date)
}

function setAlarm(event) {
    const alarmTimeDuration = event.target.value;
    getTabInformation(alarmTimeDuration);
}

function getTabInformation(alarmTimeDuration) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0];
        const { url } = activeTab;
        let alarmInfo = {
            alarmTimeDuration: alarmTimeDuration,
            pageName: url,
            timeOfKick: epoch(new Date())
        }
        main(alarmInfo);
    });
}


function difference(dateNow, dateInitial) {
    let msec = dateNow.getTime() - dateInitial.getTime();
    const hours = Math.floor(msec / 1000 / 60 / 60);
    msec -= hours * 1000 * 60 * 60;
    const mins = Math.floor(msec / 1000 / 60);
    msec -= mins * 1000 * 60;
    const secs = Math.floor(msec / 1000);
    msec -= secs * 1000;
    return hours + ":" + mins + ":" + secs;
}

function main(alarmInformation) {
    const { alarmTimeDuration } = alarmInformation;
    let minutes = parseFloat(alarmTimeDuration);
    chrome.browserAction.setBadgeText({ text: 'ON' });
    chrome.alarms.create({ delayInMinutes: minutes });
    chrome.storage.sync.set({ alarm: alarmInformation });
    window.close();
}

function clearAlarm() {
    chrome.browserAction.setBadgeText({ text: '' });
    chrome.alarms.clearAll();
    window.close();
}

document.getElementById('1min').addEventListener('click', setAlarm);
document.getElementById('10min').addEventListener('click', setAlarm);
document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);
