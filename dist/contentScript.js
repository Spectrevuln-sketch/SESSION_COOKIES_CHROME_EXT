/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************************************!*\
  !*** ./src/contentScript/contentScript.ts ***!
  \********************************************/
chrome.runtime.sendMessage("From Content Script", (response) => {
    console.log(response);
});

/******/ })()
;
//# sourceMappingURL=contentScript.js.map