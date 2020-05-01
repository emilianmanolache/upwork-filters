chrome.runtime.onInstalled.addListener(() => {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [new chrome.declarativeContent.PageStateMatcher({
				pageUrl: {
					hostContains: '.upwork.com'
				},
				css: ["span[data-advanced-search]"]
			})
			],
			actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
	});
});
