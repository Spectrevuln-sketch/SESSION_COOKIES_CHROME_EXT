/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/background/background.ts":
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webextension_polyfill_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webextension-polyfill-ts */ "./node_modules/webextension-polyfill-ts/lib/index.js");
/* harmony import */ var _utils_browserDetector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @utils/browserDetector */ "./src/utils/browserDetector.ts");


// async function handleMessage(request, sender) {
//   console.log(`content script sent a message`);
//   if(request.action === 'forwardToContentScript'){
//       const tabs = await browser.tabs.query({ active: true, currentWindow: true })
//       if (tabs.length > 0) {
//         const tabId = tabs[0].id;
//         const response = await browser.tabs.sendMessage(tabId, { action: 'forwardToContentScript', data: request.data })
//         return response
//       }
//   }
// }
// browser.runtime.onMessage.addListener(handleMessage);
webextension_polyfill_ts__WEBPACK_IMPORTED_MODULE_0__.browser.tabs.onActivated.addListener(_utils_browserDetector__WEBPACK_IMPORTED_MODULE_1__.debouncedCookieHandler);
webextension_polyfill_ts__WEBPACK_IMPORTED_MODULE_0__.browser.cookies.onChanged.addListener(_utils_browserDetector__WEBPACK_IMPORTED_MODULE_1__.debouncedCookieHandler);
// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.sync.set({ proxyActive: false });
// });
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === 'getCookies') {
//     chrome.cookies.getAll({ domain: message.domain }, (cookies) => {
//       setStoredCookies({
//         domain: message.domain,
//         cookies:cookies
//       })
//       sendResponse({ cookies: cookies });
//     });
//     // Indicate that we will send a response asynchronously
//     return true;
//   }
//   if (message.action === 'getTabInfo') {
//     // Mendapatkan informasi tab aktif
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       const tab = tabs[0];
//       if (tab) {
//         // contentWebActive
//         sendResponse({
//           title: tab.title,
//           faviconUrl: tab.favIconUrl,
//           url: tab.url
//         });
//       } else {
//         sendResponse({ error: 'Tidak ada tab aktif' });
//       }
//     });
//     // Indicate that we will send a response asynchronously
//     return true;
//   }
//   if (message.action === 'openNewTabAndSetCookie') {
//     const { cookieDetails, url } = message.data;
//     // Validate cookie details and URL
//     if (!cookieDetails || !Array.isArray(cookieDetails) || !url) {
//       console.error('Invalid cookie data or URL');
//       return;
//     }
//     chrome.tabs.create({ url }, (tab) => {
//       if (chrome.runtime.lastError) {
//         console.error(`Error creating tab: ${chrome.runtime.lastError}`);
//         return;
//       }
//       // Set cookies on the newly created tab
//       cookieDetails.forEach(cookie => {
//         const { hostOnly, session, ...validCookieDetails } = cookie;
//         // Remove the hostOnly property
//         const cookieConfig = {
//           ...validCookieDetails,
//           url: tab.url,
//           expires: Date.now() + (1000 * 60 * 60 * 24 * 30)
//         };
//         chrome.cookies.set(cookieConfig, (result) => {
//           console.error(`Error setting cookie: ${JSON.stringify(chrome.runtime.lastError)}`);
//           if (chrome.runtime.lastError) {
//           } else {
//             console.log('Cookie set successfully:', result);
//           }
//         });
//       });
//     });
//   }
// });


/***/ }),

/***/ "./src/utils/browserDetector.ts":
/*!**************************************!*\
  !*** ./src/utils/browserDetector.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   debouncedCookieHandler: () => (/* binding */ debouncedCookieHandler)
/* harmony export */ });
/* harmony import */ var webextension_polyfill_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webextension-polyfill-ts */ "./node_modules/webextension-polyfill-ts/lib/index.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const debounce = __webpack_require__(/*! lodash.debounce */ "./node_modules/lodash.debounce/index.js");
const debouncedCookieHandler = debounce(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentTab = yield webextension_polyfill_ts__WEBPACK_IMPORTED_MODULE_0__.browser.tabs.query({
            active: true,
            lastFocusedWindow: true,
        });
        const cookies = yield webextension_polyfill_ts__WEBPACK_IMPORTED_MODULE_0__.browser.cookies.getAll({
            url: currentTab[0].url,
        });
        if (cookies.length === 0)
            return webextension_polyfill_ts__WEBPACK_IMPORTED_MODULE_0__.browser.browserAction.setBadgeText({
                text: '',
            });
        webextension_polyfill_ts__WEBPACK_IMPORTED_MODULE_0__.browser.browserAction.setBadgeBackgroundColor({
            color: getColor(cookies.length),
        });
        webextension_polyfill_ts__WEBPACK_IMPORTED_MODULE_0__.browser.browserAction.setBadgeText({
            text: cookies.length.toString(),
        });
    }
    catch (error) { }
}), 250);
const getColor = (count) => {
    if (count >= 20)
        return '#a62850';
    else if (count >= 7)
        return '#9e4524';
    // else if (count <= 6) return '#257f5a';
    return '#34363A'; // DARK
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"background": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkshare_cookies"] = self["webpackChunkshare_cookies"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_webextension-polyfill-ts_lib_index_js","vendors-node_modules_lodash_debounce_index_js"], () => (__webpack_require__("./src/background/background.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=background.js.map