chrome.runtime.sendMessage("From Content Script", (response) => {
  console.log(response)
});