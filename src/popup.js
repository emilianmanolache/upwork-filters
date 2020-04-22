document.addEventListener('DOMContentLoaded', function() {
    let typeSelect = document.getElementById('type');
    let budgetInput = document.getElementById('budget');
    let excludedLocationsInput = document.getElementById('excludedLocations');
    let excludedKeywordsInput = document.getElementById('excludedKeywords');

    chrome.storage.sync.get(['type', 'budget', 'excludedLocations', 'excludedKeywords'], (items) => {
        let type = items.type || "All";
        let budget = parseInt(items.budget) || 0;
        let excludedLocations = (items.excludedLocations || "").split(",").map(item => item.trim()).join(",");
        let excludedKeywords = (items.excludedKeywords || "").split(",").map(item => item.trim()).join(",");
        typeSelect.value = type;
        budgetInput.value = budget;
        excludedLocationsInput.value = excludedLocations;
        excludedKeywordsInput.value = excludedKeywords;
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
}, false);