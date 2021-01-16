'use strict';

chrome.alarms.onAlarm.addListener(function (evt) {
    chrome.storage.sync.get(['alarm'], function (alarmInformation) {
        let { pageName, alarmTimeDuration } = alarmInformation.alarm;
        alert(`Hey there ${pageName} is running from last ${alarmTimeDuration} min(s)`);
        chrome.browserAction.setBadgeText({ text: '' });
    });
});

chrome.notifications.onButtonClicked.addListener(function () {
    chrome.storage.sync.get(['minutes'], function (item) {
        chrome.browserAction.setBadgeText({ text: 'ON' });
        chrome.alarms.create({ delayInMinutes: item.minutes });
    });
});