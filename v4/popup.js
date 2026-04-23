document.addEventListener('DOMContentLoaded', () => {
    const toggleDark = document.getElementById('toggleDark');
    const applyBtn = document.getElementById('applyBtn');

    // Load preferensi (Default: Dark Mode ON)
    chrome.storage.sync.get(['isDark'], (data) => {
        toggleDark.checked = data.isDark !== false; 
    });

    applyBtn.addEventListener('click', () => {
        chrome.storage.sync.set({
            isDark: toggleDark.checked
        }, () => {
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                chrome.tabs.reload(tabs[0].id);
            });
        });
    });
});