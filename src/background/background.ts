//This seems to force the content-script to be reloaded when the history changes
chrome.webNavigation.onHistoryStateUpdated.addListener(async () => {
  const getCurrentTab = async () => {
    const queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  };

  const tab: chrome.tabs.Tab = await getCurrentTab();

  const url = new URL(tab.url || "");
  if (url.hostname !== "/your website here/") {
    //replace with your website
    return;
  }

  chrome.scripting.executeScript({
    target: { tabId: tab.id || 0 },
    func: () => {}, //this literally will execute an empty function in the current tab which seems to be enough to reload or reconnect the content-script
  });
});
