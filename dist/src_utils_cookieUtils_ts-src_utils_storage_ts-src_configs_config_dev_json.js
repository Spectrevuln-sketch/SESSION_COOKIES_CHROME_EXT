"use strict";
(self["webpackChunkshare_cookies"] = self["webpackChunkshare_cookies"] || []).push([["src_utils_cookieUtils_ts-src_utils_storage_ts-src_configs_config_dev_json"],{

/***/ "./src/utils/cookieUtils.ts":
/*!**********************************!*\
  !*** ./src/utils/cookieUtils.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DATE_TIME_FORMAT: () => (/* binding */ DATE_TIME_FORMAT),
/* harmony export */   calculateOneCookieSize: () => (/* binding */ calculateOneCookieSize),
/* harmony export */   changeActiveTabURL: () => (/* binding */ changeActiveTabURL),
/* harmony export */   compareCookies: () => (/* binding */ compareCookies),
/* harmony export */   currentTab: () => (/* binding */ currentTab),
/* harmony export */   formatCookies: () => (/* binding */ formatCookies),
/* harmony export */   formatNewCookie: () => (/* binding */ formatNewCookie),
/* harmony export */   generateBadges: () => (/* binding */ generateBadges),
/* harmony export */   getAllCookies: () => (/* binding */ getAllCookies),
/* harmony export */   getCookiesSize: () => (/* binding */ getCookiesSize),
/* harmony export */   getCurrentDomainFromUrl: () => (/* binding */ getCurrentDomainFromUrl),
/* harmony export */   getCurrentUrlFromTab: () => (/* binding */ getCurrentUrlFromTab),
/* harmony export */   getExpirationDate: () => (/* binding */ getExpirationDate),
/* harmony export */   getExpirationDateString: () => (/* binding */ getExpirationDateString),
/* harmony export */   getMainDomain: () => (/* binding */ getMainDomain),
/* harmony export */   getSizeOfValues: () => (/* binding */ getSizeOfValues),
/* harmony export */   getURL: () => (/* binding */ getURL),
/* harmony export */   groupCookiesByDomain: () => (/* binding */ groupCookiesByDomain),
/* harmony export */   humanReadableSize: () => (/* binding */ humanReadableSize),
/* harmony export */   openNewTab: () => (/* binding */ openNewTab),
/* harmony export */   openTabAndSetCookie: () => (/* binding */ openTabAndSetCookie),
/* harmony export */   perfTracker: () => (/* binding */ perfTracker),
/* harmony export */   sortCookiesByDomain: () => (/* binding */ sortCookiesByDomain)
/* harmony export */ });
/* harmony import */ var webextension_polyfill_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webextension-polyfill-ts */ "./node_modules/webextension-polyfill-ts/lib/index.js");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/es/groupBy.js");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/es/sortBy.js");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/es/sum.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/getUnixTime.mjs");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/parse.mjs");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/formatDistanceToNow.mjs");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/fromUnixTime.mjs");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/format.mjs");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/addHours.mjs");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/es/isEmpty.js");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/es/isNil.js");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/es/pick.js");
/* harmony import */ var parse_domain__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! parse-domain */ "./node_modules/parse-domain/build/parse-domain.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Polyfill

// Helpers




// Ramda Functions
const groupCookiesByDomain = (0,ramda__WEBPACK_IMPORTED_MODULE_1__["default"])((cookie) => cookie.domain);
const sortCookiesByDomain = (0,ramda__WEBPACK_IMPORTED_MODULE_2__["default"])((mappedCookies) => mappedCookies.domain.length);
const DATE_TIME_FORMAT = "yyyy-MM-dd'T'HH:mm";
const getMainDomain = (url) => {
    try {
        const parsedUrl = new URL(url);
        const hostname = parsedUrl.hostname;
        // Extract the main domain from the hostname
        const parts = hostname.split('.');
        if (parts.length > 2) {
            // Assuming the domain is the last two parts
            return parts.slice(-2).join('.');
        }
        return hostname; // Return as is if it's already a main domain
    }
    catch (error) {
        console.error('Error parsing URL:', error);
        return ''; // Return empty string if parsing fails
    }
};
const formatCookies = (cookies, url) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const newCookie = formatNewCookie(cookies, url);
    console.log('FINAL COOKIE', newCookie);
    webextension_polyfill_ts__WEBPACK_IMPORTED_MODULE_0__.browser.cookies
        .remove({
        url: newCookie.url,
        name: newCookie.name,
        storeId: newCookie.storeId,
    })
        .then(() => {
        webextension_polyfill_ts__WEBPACK_IMPORTED_MODULE_0__.browser.cookies.set(newCookie).then(e => {
            console.log('FIN', e);
        });
    });
});
const changeActiveTabURL = (newURL) => __awaiter(void 0, void 0, void 0, function* () {
    // Mendapatkan tab yang sedang aktif
    const [activeTab] = yield webextension_polyfill_ts__WEBPACK_IMPORTED_MODULE_0__.browser.tabs.query({ active: true, currentWindow: true });
    if (activeTab) {
        // Mengubah URL tab aktif
        yield webextension_polyfill_ts__WEBPACK_IMPORTED_MODULE_0__.browser.tabs.update(activeTab.id, { url: newURL });
        console.log("Tab URL updated to:", newURL);
    }
    else {
        console.log("No active tab found.");
    }
});
const perfTracker = (name, fnc) => __awaiter(void 0, void 0, void 0, function* () {
    console.time(name);
    yield fnc();
    console.timeEnd(name);
});
const getCookiesSize = (cookies, returnNumber = false) => {
    const sizes = cookies.map(cookie => calculateOneCookieSize(cookie));
    const size = (0,ramda__WEBPACK_IMPORTED_MODULE_3__["default"])(sizes);
    if (returnNumber)
        return size;
    return humanReadableSize(size);
};
const humanReadableSize = (size) => size > 1000 ? `${(size / 1000).toFixed(2)} kb` : `${size} bytes`;
// export const getSizeOfValues = (...args: string[]) =>
//   Buffer.byteLength(args.join(''));
const getSizeOfValues = (...args) => {
    const encoder = new TextEncoder();
    return encoder.encode(args.join('')).length;
};
const calculateOneCookieSize = (cookie, humanReadable = false) => {
    const size = getSizeOfValues(cookie.name, cookie.value);
    if (humanReadable)
        return humanReadableSize(size);
    return size;
};
const getCurrentDomainFromUrl = (url) => {
    if (!url)
        return '';
    const parsedDomainUrl = (0,parse_domain__WEBPACK_IMPORTED_MODULE_4__.parseDomain)(url);
    if (parsedDomainUrl.type !== parse_domain__WEBPACK_IMPORTED_MODULE_4__.ParseResultType.Listed)
        return '';
    return [parsedDomainUrl.domain, parsedDomainUrl.topLevelDomains].join('.');
};
const getCurrentUrlFromTab = (fullUrl) => {
    if (ramda__WEBPACK_IMPORTED_MODULE_5__["default"](fullUrl) || ramda__WEBPACK_IMPORTED_MODULE_6__["default"](fullUrl)) {
        return null;
    }
    const parsedDomainUrl = (0,parse_domain__WEBPACK_IMPORTED_MODULE_4__.parseDomain)(fullUrl);
    if (parsedDomainUrl.type !== parse_domain__WEBPACK_IMPORTED_MODULE_4__.ParseResultType.Listed) {
        return null;
    }
    const currentUrl = (parsedDomainUrl === null || parsedDomainUrl === void 0 ? void 0 : parsedDomainUrl.subDomains[0]) === '' || (parsedDomainUrl === null || parsedDomainUrl === void 0 ? void 0 : parsedDomainUrl.subDomains[0]) === 'www'
        ? [parsedDomainUrl.domain, parsedDomainUrl.topLevelDomains].join('.')
        : [
            parsedDomainUrl === null || parsedDomainUrl === void 0 ? void 0 : parsedDomainUrl.subDomains[0],
            parsedDomainUrl === null || parsedDomainUrl === void 0 ? void 0 : parsedDomainUrl.domain,
            parsedDomainUrl === null || parsedDomainUrl === void 0 ? void 0 : parsedDomainUrl.topLevelDomains,
        ].join('.');
    return currentUrl;
};
const formatNewCookie = (cookie, currentUrl) => {
    const PICK_FIELDS = [
        'name',
        'storeId',
        'value',
        'expirationDate',
        'path',
        'httpOnly',
        'secure',
    ];
    const secure = currentUrl.indexOf('https://') === 0;
    const hostOnlyDomain = cookie.domain.substr(0, 1) === '.'
        ? cookie.domain.substring(1)
        : cookie.domain;
    // @ts-ignore
    return Object.assign(Object.assign(Object.assign({}, ramda__WEBPACK_IMPORTED_MODULE_7__["default"](PICK_FIELDS, Object.assign(Object.assign({}, cookie), { expirationDate: (0,date_fns__WEBPACK_IMPORTED_MODULE_8__.getUnixTime)((0,date_fns__WEBPACK_IMPORTED_MODULE_9__.parse)(cookie.expirationDateString, DATE_TIME_FORMAT, new Date())) }))), (!cookie.hostOnly && Boolean(cookie.domain.substr(0, 1) === '.')
        ? { domain: hostOnlyDomain }
        : {})), { url: `http${secure ? 's' : ''}://${hostOnlyDomain}${cookie.path}` });
};
const getURL = (url) => {
    if (!url)
        return '';
    try {
        const domain = new URL(url).hostname;
        return domain === 'newtab' ? '' : domain.replace('www.', '');
    }
    catch (error) {
        return '';
    }
};
const openTabAndSetCookie = (cookies, url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Buat tab baru
        const tab = yield webextension_polyfill_ts__WEBPACK_IMPORTED_MODULE_0__.browser.tabs.create({ url });
        // Tunggu hingga tab selesai dimuat
        webextension_polyfill_ts__WEBPACK_IMPORTED_MODULE_0__.browser.tabs.onUpdated.addListener((tabId, changeInfo) => __awaiter(void 0, void 0, void 0, function* () {
            if (tabId === tab.id && changeInfo.status === 'complete') {
                // Setel cookie untuk tab yang baru dibuat
                try {
                    formatCookies(cookies, url);
                    console.log('Cookie telah diatur dengan sukses.');
                }
                catch (error) {
                    console.error('Error mengatur cookie:', error);
                }
            }
        }));
    }
    catch (error) {
        console.error('Error membuka tab:', error);
    }
});
const openNewTab = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tab = yield webextension_polyfill_ts__WEBPACK_IMPORTED_MODULE_0__.browser.tabs.create({ url, active: false });
        return tab;
    }
    catch (error) {
        console.error('Error opening new tab:', error);
    }
});
const currentTab = () => __awaiter(void 0, void 0, void 0, function* () {
    const tab = yield webextension_polyfill_ts__WEBPACK_IMPORTED_MODULE_0__.browser.tabs.query({
        active: true,
        currentWindow: true,
    });
    return tab[0];
});
const getAllCookies = () => __awaiter(void 0, void 0, void 0, function* () {
    const tab = yield currentTab();
    // Get the main domain from the URL
    const mainDomain = getMainDomain(tab.url);
    // If domain extraction failed, return null
    if (!mainDomain) {
        return null;
    }
    // Fetch cookies based on the main domain
    const cookies = yield webextension_polyfill_ts__WEBPACK_IMPORTED_MODULE_0__.browser.cookies.getAll({ domain: mainDomain });
    console.log('Parsed Domain cookies >>>', cookies);
    // Group cookies by domain
    const groupedCookies = groupCookiesByDomain(cookies);
    // Map cookies to the desired format
    const mappedCookies = Object.entries(groupedCookies).map(([domain, cookiesList]) => {
        const size = getCookiesSize(cookiesList, true);
        const formattedCookies = cookiesList.map((cookie) => {
            const cookieSize = calculateOneCookieSize(cookie);
            const newCookie = Object.assign(Object.assign({}, cookie), { size: cookieSize, formatedSize: humanReadableSize(cookieSize), expirationMessage: getExpirationDate(cookie), expirationDateString: getExpirationDateString(cookie.expirationDate), badges: generateBadges(cookie) });
            return newCookie;
        });
        return {
            domain,
            size,
            formatedSize: humanReadableSize(size),
            cookies: formattedCookies,
        };
    });
    return sortCookiesByDomain(mappedCookies);
});
const compareCookies = (newCookies, oldCookies) => JSON.stringify(newCookies) === JSON.stringify(oldCookies);
const getExpirationDate = (cookie) => {
    if (cookie.session)
        return 'Session';
    if (!cookie.expirationDate)
        return null;
    return (0,date_fns__WEBPACK_IMPORTED_MODULE_10__.formatDistanceToNow)((0,date_fns__WEBPACK_IMPORTED_MODULE_11__.fromUnixTime)(cookie.expirationDate));
};
const getExpirationDateString = (time = null) => {
    return (0,date_fns__WEBPACK_IMPORTED_MODULE_12__.format)(time ? (0,date_fns__WEBPACK_IMPORTED_MODULE_11__.fromUnixTime)(time) : (0,date_fns__WEBPACK_IMPORTED_MODULE_13__.addHours)(new Date(), 1), DATE_TIME_FORMAT);
};
const generateBadges = (cookie) => {
    let badges = [];
    if (cookie.httpOnly)
        badges.push({
            badgeName: 'HttpOnly',
        });
    if (cookie.secure)
        badges.push({
            badgeName: 'Secure',
        });
    return badges;
};


/***/ }),

/***/ "./src/utils/storage.ts":
/*!******************************!*\
  !*** ./src/utils/storage.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCookieFromExtension: () => (/* binding */ getCookieFromExtension),
/* harmony export */   getFormData: () => (/* binding */ getFormData),
/* harmony export */   getStoredCookies: () => (/* binding */ getStoredCookies),
/* harmony export */   getStoredToken: () => (/* binding */ getStoredToken),
/* harmony export */   getUserStorage: () => (/* binding */ getUserStorage),
/* harmony export */   setFormData: () => (/* binding */ setFormData),
/* harmony export */   setStoredCookies: () => (/* binding */ setStoredCookies),
/* harmony export */   setStoredToken: () => (/* binding */ setStoredToken),
/* harmony export */   setUserStorage: () => (/* binding */ setUserStorage)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getCookieFromExtension() {
    // Pastikan ini sesuai dengan URL dari mana cookie disetel
    const cookieURL = 'chrome-extension://' + chrome.runtime.id;
    let tokenCookies;
    chrome.cookies.get({ url: cookieURL, name: 'yourCookieName' }, (cookie) => {
        if (cookie) {
            tokenCookies = cookie.value;
        }
        else {
            tokenCookies = null;
        }
    });
    return tokenCookies;
}
;
function setStoredToken(token, ttl) {
    const now = new Date().getTime(); // Waktu saat ini dalam milidetik
    const expiry = now + ttl; // Hitung waktu kedaluwarsa
    const vals = {
        token,
        expiry
    };
    return new Promise((resolve) => {
        chrome.storage.local.set(vals, () => {
            resolve();
        });
    });
}
function getStoredToken() {
    return __awaiter(this, void 0, void 0, function* () {
        const keys = ['token', 'expiry'];
        return new Promise((resolve) => {
            chrome.storage.local.get(keys, (res) => {
                var _a;
                const now = new Date().getTime(); // Waktu saat ini dalam milidetik
                if (res.expiry && now > res.expiry) {
                    // Jika token sudah kedaluwarsa, hapus dari storage
                    chrome.storage.local.remove(['token', 'expiry'], () => {
                        resolve(''); // Token tidak ada atau kedaluwarsa
                    });
                }
                else {
                    // Jika token masih valid
                    resolve((_a = res.token) !== null && _a !== void 0 ? _a : '');
                }
            });
        });
    });
}
function setStoredCookies(cookiesData) {
    const vals = {
        cookiesData
    };
    return new Promise((resolve) => {
        chrome.storage.local.set(vals, () => {
            resolve();
        });
    });
}
function getStoredCookies() {
    return __awaiter(this, void 0, void 0, function* () {
        const keys = ['cookiesData'];
        return new Promise((resolve) => {
            chrome.storage.local.get(keys, (res) => {
                var _a;
                resolve((_a = res.cookiesData) !== null && _a !== void 0 ? _a : {});
            });
        });
    });
}
function setFormData(formData) {
    const vals = {
        formData
    };
    return new Promise((resolve) => {
        chrome.storage.local.set(vals, () => {
            resolve();
        });
    });
}
function getFormData() {
    return __awaiter(this, void 0, void 0, function* () {
        const keys = ['formData'];
        return new Promise((resolve) => {
            chrome.storage.local.get(keys, (res) => {
                var _a;
                resolve((_a = res.formData) !== null && _a !== void 0 ? _a : {});
            });
        });
    });
}
function getUserStorage() {
    return __awaiter(this, void 0, void 0, function* () {
        const keys = ['user'];
        return new Promise((resolve) => {
            chrome.storage.local.get(keys, (res) => {
                var _a;
                resolve((_a = res.user) !== null && _a !== void 0 ? _a : {});
            });
        });
    });
}
function setUserStorage(userData) {
    const vals = {
        user: userData
    };
    return new Promise((resolve) => {
        chrome.storage.local.set(vals, () => {
            resolve();
        });
    });
}


/***/ }),

/***/ "./src/configs/config.dev.json":
/*!*************************************!*\
  !*** ./src/configs/config.dev.json ***!
  \*************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"API_URL":"https://session-api.akatech.site"}');

/***/ })

}]);
//# sourceMappingURL=src_utils_cookieUtils_ts-src_utils_storage_ts-src_configs_config_dev_json.js.map