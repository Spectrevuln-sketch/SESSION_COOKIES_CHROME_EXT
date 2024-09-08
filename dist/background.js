/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log(msg);
    console.log(sender);
    sendResponse("From The Background");
});

/******/ })()
;
//# sourceMappingURL=background.js.map