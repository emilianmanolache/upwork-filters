// reload page when settings are changed
chrome.storage.onChanged.addListener(function (changes, namespace) {
    window.location.reload();
});

// apply filters
chrome.storage.sync.get(['type', 'budget', 'excludedLocations', 'excludedKeywords', 'excludedTags'], (items) => {
    setInterval(function() {
        let targetPageSignature = document.querySelector('span[data-advanced-search]');
        if (!targetPageSignature) return;

        let type = items.type || "All";
        let budget = parseInt(items.budget) || 0;
        let excludedLocations = (items.excludedLocations || "").split(",").map(item => item.trim());
        let excludedKeywords = (items.excludedKeywords || "").split(",").map(item => item.trim());
        let excludedTags = (items.excludedTags || "").split(",").map(item => item.trim());

        let jobs = document.getElementsByClassName("job-tile");
        if (jobs.length) filterJobs(jobs, type, budget, excludedLocations, excludedKeywords, excludedTags);

    }, 500);
});

function filterJobs(jobs, type, budget, excludedLocations, excludedKeywords, excludedTags) {
    for (let job of jobs) {
        let jobTypeContainer = job.getElementsByClassName('js-type');
        let budgetContainer = job.getElementsByClassName('js-budget');
        let locationContainer = job.getElementsByClassName('client-location');
        let titleContainer = job.getElementsByClassName('job-title');
        let tagsContainer = job.getElementsByClassName('js-skills');

        if (budgetContainer.length) budgetContainer = budgetContainer[0].getElementsByTagName('span');

        let jobType = jobTypeContainer.length ? jobTypeContainer[0].textContent : null;
        let jobBudget = budgetContainer.length ? parseInt(budgetContainer[1].textContent.replace(/\$/gi, '').replace(/,/gi, '')) : null;
        let location = locationContainer.length ? locationContainer[0].textContent : null;
        let title = titleContainer.length ? titleContainer[0].textContent : null;
        let tags = tagsContainer.length ? tagsContainer[0].getElementsByClassName('js-skill') : [];
        if (tags) tags = Array.from(tags).map(item => item.textContent.toLowerCase().trim());

        if (title) title = title.replace(/-/, ' ').toLowerCase();
        let keywords = title ? title.split(" ").map(item => item.trim()).filter(item => item) : [];

        if (jobType && type !== "All" && jobType !== type) job.remove();
        if (jobBudget && jobBudget < budget) job.remove();
        if (location && excludedLocations && excludedLocations.some(item => item.toLowerCase() === location.toLowerCase())) job.remove();
        if (keywords && keywords.length && excludedKeywords && excludedKeywords.some(item => keywords.indexOf(item.toLowerCase()) !== -1)) job.remove();
        if (title && excludedKeywords.some(item => item.indexOf(" ") !== -1 && title.indexOf(item.toLowerCase()) !== -1)) job.remove();
        if (tags && excludedTags.some(item => tags.indexOf(item.toLowerCase()) !== -1)) job.remove();
    }
}