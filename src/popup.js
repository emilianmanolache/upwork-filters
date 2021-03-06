document.addEventListener('DOMContentLoaded', function() {
    let typeSelect = document.getElementById('type');
    let budgetInput = document.getElementById('budget');
    let excludedLocationsInput = document.getElementById('excludedLocations');
    let excludedKeywordsInput = document.getElementById('excludedKeywords');
    let excludedTagsInput = document.getElementById('excludedTags');
    let itemsToLoadInput = document.getElementById('itemsToLoad');

    chrome.storage.sync.get(['type', 'budget', 'excludedLocations', 'excludedKeywords', 'excludedTags', 'itemsToLoad'], (items) => {
        let type = items.type || "All";
        let budget = parseInt(items.budget) || 0;
        let excludedLocations = (items.excludedLocations || "").split(",").map(item => item.trim()).join(",");
        let excludedKeywords = (items.excludedKeywords || "").split(",").map(item => item.trim()).join(",");
        let excludedTags = (items.excludedTags || "").split(",").map(item => item.trim()).join(",");
        let itemsToLoad = parseInt(items.itemsToLoad) || 10;
        typeSelect.value = type;
        budgetInput.value = budget;
        excludedLocationsInput.value = excludedLocations;
        excludedKeywordsInput.value = excludedKeywords;
        excludedTagsInput.value = excludedTags;
        itemsToLoadInput.value = itemsToLoad;
    });

    typeSelect.onchange = function (element) {
        chrome.storage.sync.set({
            'type': element.target.value
        });
    };
    budgetInput.onchange = function (element) {
        chrome.storage.sync.set({
            'budget': element.target.value
        });
    };
    excludedLocationsInput.onchange = function (element) {
        chrome.storage.sync.set({
            'excludedLocations': element.target.value
        });
    };
    excludedKeywordsInput.onchange = function (element) {
        chrome.storage.sync.set({
            'excludedKeywords': element.target.value
        });
    };
    excludedTagsInput.onchange = function (element) {
        chrome.storage.sync.set({
            'excludedTags': element.target.value
        });
    };
    itemsToLoadInput.onchange = function (element) {
        chrome.storage.sync.set({
            'itemsToLoad': element.target.value
        });
    };
}, false);